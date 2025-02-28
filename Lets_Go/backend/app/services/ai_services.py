import logging
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
from app.models.schemas import CoursePathway
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate


class EDAI:
    def __init__(self):
        llm = HuggingFaceEndpoint(
            # repo_id="meta-llama/Meta-Llama-3-8B-Instruct",
            repo_id="deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
            task="text-generation",
            max_new_tokens=100,
            do_sample=False,
            repetition_penalty=1.03,
        )
        
        
        chat = ChatHuggingFace(llm=llm, verbose=True)

        self.chat = chat
                
        parser = JsonOutputParser(pydantic_object=CoursePathway)
        
        # Create the prompt template
        prompt = ChatPromptTemplate.from_template(
            """
Generate a structured learning pathway for the course "{course_name}" at the "{difficulty_level}" difficulty level.

{format_instructions}

### Guidelines:
- Adjust depth and complexity based on difficulty level:
  - Beginner: Focus on fundamental concepts, clear explanations, and essential terminology.
  - Intermediate: Cover more technical details, real-world applications, and practical implementations.
  - Advanced: Dive deep into theories, optimizations, and latest advancements.
- Maintain a logical flow, but the first module doesn't always have to be an introduction.
- Create 5-8 modules total, each with 3-5 sub-headings.
- Ensure the content is comprehensive for the specified difficulty level.
            """
        )

        # Add format instructions to the prompt
        prompt = prompt.partial(
            format_instructions=parser.get_format_instructions()
        )

        # Create the chain
        chain = prompt | chat | parser
        self.pathway_chain = chain


    def generate_pathway(self, **request):
        print("hi")
        try:
            # Generate the structured learning pathway
            response = self.pathway_chain.invoke({
                "course_name": request.get("course_name"),
                "difficulty_level": request.get("difficulty")
            })
            logging.info(f"Generated pathway response: {response}")
            return response
        except Exception as e:
            logging.error(f"Error generating pathway: {e}")
            raise

