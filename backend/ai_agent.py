import os
import warnings
from dotenv import load_dotenv

# Suppress deprecation warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
from langchain_openai import ChatOpenAI
from langchain_tavily import TavilySearch
from langgraph.prebuilt import create_react_agent
from langchain_core.messages.ai import AIMessage
load_dotenv()
from langchain_community.tools.tavily_search import TavilySearchResults


GROQ_API_KEY=os.getenv("GROQ_API_KEY")
TAVILY_API_KEY=os.getenv("TAVILY_API_KEY")
OPENAI_API_KEY=os.getenv("OPENAI_API_KEY")

from langchain_groq import ChatGroq


openai_llm=ChatOpenAI(model="gpt-4o-mini",api_key=OPENAI_API_KEY)
groq_llm=ChatGroq(model="llama-3.3-70b-versatile",api_key=GROQ_API_KEY)



search_tool=TavilySearch(max_results=1,tavily_api_key=TAVILY_API_KEY)

system_prompt="""
You are a friendly mental health support chatbot.When giving advice or suggestions, always: 
-word limit between 250-300 word.
-Always use one newline per point (short lines) 
-Use short, simple sentences.
-Include headings if necessary.
-give short paragraphs.
-Make it actionable and easy to read for someone feeling stressed or anxious.
-remove * and replace it to number 
- If the user mentions serious distress or crisis, suggest contacting a counsellor from college. 
"""

import re

def format_response(text: str) -> str:
     
    formatted = re.sub(r'\s*(\d+\.)\s*', r'\n\1 ', text)
    
    
    formatted = formatted.replace(
        "Here are some ideas to help you feel good and manage stress:",
        "### Here are some ideas to help you feel good and manage stress:"
    )
    
    return formatted.strip()


def get_response_from_ai_agent(llm_id, messages, allow_search, system_prompt, provider):
    """
    messages: List[Dict] with keys 'role' ('user' or 'ai') and 'text'
    """
    try:
        tools = [TavilySearchResults(max_results=1)] if allow_search else []

        if provider == "Groq":
            llm = ChatGroq(model=llm_id, api_key=GROQ_API_KEY)
        else:
            if not OPENAI_API_KEY or OPENAI_API_KEY == "your_openai_api_key_here":
                return {"error": "OpenAI API key not configured. Please add your OpenAI API key to the .env file."}
            llm = ChatOpenAI(model=llm_id, api_key=OPENAI_API_KEY)

        agent = create_react_agent(model=llm, tools=tools)

        
        formatted_messages = [{"role": "system", "content": system_prompt}]
        for msg in messages:
            role = msg["role"]
            content = msg["text"]
            formatted_messages.append({"role": role, "content": content})

        response = agent.invoke({"messages": formatted_messages})

        msgs = response.get("messages")
        ai_messages = [m.content for m in msgs if isinstance(m, AIMessage)]
        final_text = ai_messages[-1]
        return format_response(final_text) 

    except Exception as e:
        error_msg = str(e)
        if "quota" in error_msg.lower() or "insufficient_quota" in error_msg.lower():
            return {"error": "API quota exceeded. Please check your billing or try using Groq instead."}
        elif "api_key" in error_msg.lower():
            return {"error": "API key not configured. Please add your API keys to the .env file."}
        else:
            return {"error": f"An error occurred: {error_msg}"}
