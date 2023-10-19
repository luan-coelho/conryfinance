"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FormOvedoria() {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([{
    pergunta: "Quanto é 1 mais 2?",
    alternativas: [
      "1", "2", "3", "4", "5",
    ],
    correta: 1,
  }]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [pergunta, setPergunta] = useState<string>();
  const [alternativa1, setAlternativa1] = useState<string>();
  const [alternativa2, setAlternativa2] = useState<string>();
  const [alternativa3, setAlternativa3] = useState<string>();
  const [alternativa4, setAlternativa4] = useState<string>();
  const [alternativa5, setAlternativa5] = useState<string>();

  type Pergunta = {
    pergunta: String,
    alternativas: string[],
    correta: number
  }

  function novaPergunta() {
    let perguntaAux = {
      pergunta: pergunta!,
      alternativas: [
        alternativa1!, alternativa2!, alternativa3!, alternativa4!, alternativa5!,
      ],
      correta: 1,
    };
    perguntas.push({
      ...perguntaAux,
    });
    setPerguntas(perguntas);
    setShowForm(false);
  }

  return <>
    <Card className="md:w-full h-full">
      <CardHeader
        className="bg-zinc-800 flex items-center justify-center text-center font-medium text-white rounded-t-xl rounded-b-3xl">
        <CardTitle className="text-xl">Formulário</CardTitle>
      </CardHeader>
      <CardContent className="px-3 py-4">
        {perguntas.map((p, index) => {
          return <>
            <div>
              <h2 className="font-bold">{index + 1}. {p.pergunta}</h2>
              <div className="mx-8 my-2">
                {p.alternativas.map((alternativa, index) => {
                  return <><span className="block">{index + 1}) {alternativa}</span> </>;
                })}
              </div>
            </div>
          </>;
        })}

        <Button className="mt-5 w-full" onClick={() => setShowForm(true)}>Nova pergunta</Button>

        {showForm &&
          <div className="mt-4">
            <form>
              <div>
                <label htmlFor="pergunta">Pergunta</label>
                <Textarea className="h-40" onChange={(e) => setPergunta(e.target.value)}></Textarea>
              </div>

              <label htmlFor="pergunta1">Alternativa 1</label>
              <Input onChange={(e) => setAlternativa1(e.target.value)} type="text" />

              <label htmlFor="pergunta2">Alternativa 2</label>
              <Input onChange={(e) => setAlternativa2(e.target.value)} type="text" />

              <label htmlFor="pergunta4">Alternativa 3</label>
              <Input onChange={(e) => setAlternativa3(e.target.value)} type="text" />

              <label htmlFor="pergunta4">Alternativa 4</label>
              <Input onChange={(e) => setAlternativa4(e.target.value)} type="text" />

              <label htmlFor="pergunta5">Alternativa 5</label>
              <Input onChange={(e) => setAlternativa5(e.target.value)} type="text" />

              <Button className="w-full mt-2" onClick={novaPergunta}>Nova</Button>
            </form>
          </div>
        }

      </CardContent>
    </Card>
  </>;
}