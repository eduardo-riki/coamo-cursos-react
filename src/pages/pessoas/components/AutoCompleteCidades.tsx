import { useEffect, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { CidadesServices } from "../../../shared/services/api/cidades/CidadesServices";
import { UseDebounce } from "../../../shared/hooks";
import { Control, Controller } from "react-hook-form";
import { TDetalhesDePessoas } from "../DetalhesDePessoas";

type TAutoCompleteOption = {
  id: number;
  label: string;
};

export const AutoCompleteCidade = ({
  control,
  error,
}: {
  control: Control<TDetalhesDePessoas, any>;
  error: string | undefined;
}) => {
  const { debounce } = UseDebounce();

  const [selectedId, setSelectedId] = useState<number | undefined>(0);

  const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesServices.getAll(1, pesquisa).then((result) => {
        setIsLoading(false);
        console.log(result);
        if (result instanceof Error) {
          // alert(result.message);
        } else {
          setOpcoes(
            result.data.map((cidade) => ({ id: cidade.id, label: cidade.nome }))
          );
        }
      });
    });
  }, [debounce, pesquisa, selectedId]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = opcoes.find((opcao) => opcao.id === selectedId);

    if (!selectedOption) return null;

    return selectedOption;
  }, [selectedId, opcoes]);

  return (
    <Controller
      name="cidadeId"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Autocomplete
          openText="Abrir"
          closeText="Fechar"
          noOptionsText="Sem opções"
          loadingText="Carregando..."
          disablePortal
          size="small"
          options={opcoes}
          loading={isLoading}
          value={autoCompleteSelectedOption}
          onChange={(_, newValue) => {
            setSelectedId(newValue?.id);
            setPesquisa("");
            field.onChange(newValue ? newValue.id : null);
          }}
          onInputChange={(_, newInputValue) => setPesquisa(newInputValue)}
          popupIcon={isLoading ? <CircularProgress size={16} /> : undefined}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Cidade"
              required
              error={!!error}
            />
          )}
        />
      )}
    />
  );
};
