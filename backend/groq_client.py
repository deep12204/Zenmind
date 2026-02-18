from groq import Groq
import os

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def call_groq_ai(prompt):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "system", "content": "You are a certified nutritionist AI."},
                  {"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
