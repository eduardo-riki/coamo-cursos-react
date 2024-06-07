import { useNavigate, useParams } from "react-router-dom";

import { CidadesServices } from "../../shared/services/api";
import { useEffect } from "react";
import { FormularioDeCidade } from "./forms/FormularioDeCidade";

export type TDetalhesDeCidades = {
  nome: string;
  estado: string;
};

export const DetalhesDeCidades = () => {
  const { id = "cadastrar" } = useParams<"id">();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== "cadastrar") {
      CidadesServices.getById(Number(id)).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro atualizado com sucesso!");
          navigate("/cidades/detalhe/" + id);
        }
      });
    }
  }, [id, navigate]);

  const handleSave = (data: TDetalhesDeCidades) => {
    if (id !== "cadastrar") {
      CidadesServices.updateById(Number(id), { id: Number(id), ...data }).then(
        (result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert("Registro atualizado com sucesso!");
            navigate("/cidades/detalhe/" + id);
          }
        }
      );
      return true;
    }

    CidadesServices.create(data).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        alert("Registro cadastrado com sucesso!");
        navigate("/cidades/detalhe/" + result);
      }
      return true;
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Deseja realmente remover este registro?")) {
      CidadesServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/cidades");
        }
      });
    }
  };

  return (
    <FormularioDeCidade
      id={id}
      novaCidade={id === "cadastrar"}
      cidade={{ nome: "", estado: "" }}
      handleSave={handleSave}
      handleDelete={handleDelete}
    />
  );
};
