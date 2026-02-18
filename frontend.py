import streamlit as st
import requests
BACKEND_URL="http://localhost:8000/ask"

st.set_page_config(page_title="ZenMind: Mental Health Theripst",layout="wide")
st.title("ZenMind-AI Mental Health Therapist")
st.write("Create and Interact with ZenMind")

if "chat_history" not in st.session_state:
  st.session_state.chat_history=[]


user_input=st.chat_input("What's on your mind today?")
if user_input:
  st.session_state.chat_history.append({"role":"user","content":user_input})
  fixed_dummy_response_from_backend=requests.post(BACKEND_URL, json={"message":user_input})

  
  st.session_state.chat_history.append({"role":"assistant","content":fixed_dummy_response_from_backend.json()})


  for msg in st.session_state.chat_history:
    with st.chat_message(msg["role"]):
      st.write(msg["content"])