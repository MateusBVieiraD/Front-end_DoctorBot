from fastapi import FastAPI, Request
from pydantic import BaseModel
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.ollama import Ollama
from llama_index.core.settings import Settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Libera o CORS para o frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# IA + índice
Settings.llm = Ollama(model="gemma2:2b")
Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")
documentos = SimpleDirectoryReader("dados_diabetes").load_data()
index = VectorStoreIndex.from_documents(documentos)
query_engine = index.as_query_engine()

class DadosPaciente(BaseModel):
    idade: int
    glicose: float
    imc: float
    pressao: int

@app.post("/avaliar")
def avaliar_diabetes(dados: DadosPaciente):
    prompt = (
        f"Com base nos seguintes dados do paciente, diga apenas uma das frases abaixo: "
        f"1. 'Sim, é possível que o paciente tenha diabetes.' "
        f"2. 'Não, é improvável que o paciente tenha diabetes.'\n\n"
        f"Idade: {dados.idade}\n"
        f"Glicose: {dados.glicose} mg/dL\n"
        f"IMC: {dados.imc}\n"
        f"Pressão arterial: {dados.pressao} mmHg\n\n"
        f"**Importante**: Nunca se deve fazer um diagnóstico médico baseado apenas em informações limitadas. "
        f"Sempre consulte um profissional de saúde."
    )

    resposta = query_engine.query(prompt)
    return {
        "idade": dados.idade,
        "glicose": dados.glicose,
        "imc": dados.imc,
        "pressao": dados.pressao,
        "avaliacao": resposta.response.strip()
    }