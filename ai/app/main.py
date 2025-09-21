from fastapi import FastAPI
from app.routers import recommend_router, rag_router

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hello FastAPI!"}


app.include_router(recommend_router.router)
app.include_router(rag_router.router)
