package com.example.mapeamento.endpoint;


import com.example.mapeamento.model.*;
import com.example.mapeamento.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;


@RestController
@RequestMapping("fluxograma")
public class FluxogramaEndpoint {
    @Autowired
    private FiguraRepository figuraRepository;

    @Autowired
    private LinhaRepository linhaRepository;

    @Autowired
    private SetorRepository setorRepository;

    @Autowired
    private SetoresFluxogramaRepository setoresFluxogramaRepository;

    @Autowired
    private TextoRepository textoRepository;

    @Autowired
    private ConectorRepository conectorRepository;

    @Autowired
    private FluxogramaRepository fluxogramaRepository;

    @Autowired
    private ProcessosRepository processosRepository;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, path = "/cadastrar")
    public ResponseEntity<?> fluxogramaSalvar(@RequestBody List<Object> fluxograma){
        Integer id;
        List<FiguraModel> figuraModels = new ArrayList<>();
        List<ConectorModel> conectorModels = new ArrayList<>();
        List<LinhaModel> linhaModels = new ArrayList<>();
        ProcessosModel processosModel  = new ProcessosModel();
        SetoresFluxogramaModel setoresFluxogramaModel = new SetoresFluxogramaModel();

        for(Object i: fluxograma){
            LinkedHashMap aux = (LinkedHashMap) i;

            if(aux.get("nome").equals("figura")){
                FiguraModel figuraModel = new FiguraModel();
                figuraModel.setNome((String)aux.get("nome"));
                figuraModel.setDescricao((String)aux.get("descricao"));
                figuraModel.setTitulo((String)aux.get("titulo"));
                figuraModel.setIdentificador((Integer) aux.get("identificador"));
                figuraModel.setUrlImagem((String)aux.get("urlImagem"));
                figuraModel.setWidth((Integer) aux.get("width"));
                figuraModel.setHeight((Integer) aux.get("height"));
                figuraModel.setPosicaoX((Integer) aux.get("posicaoX"));
                figuraModel.setPosicaoY((Integer) aux.get("posicaoY"));
                figuraModels.add(figuraModel);
            }

            if(aux.get("nome").equals("linhaSetor") || aux.get("nome").equals("linha")){
                LinhaModel linhaModel = new LinhaModel();
                linhaModel.setNome((String)aux.get("nome"));
                linhaModel.setPosicaoIX((Integer) aux.get("posicaoIX"));
                linhaModel.setPosicaoIY((Integer) aux.get("posicaoIY"));
                linhaModel.setPosicaoX((Integer) aux.get("posicaoX"));
                linhaModel.setPosicaoY((Integer) aux.get("posicaoY"));
                linhaModel.setIdentificador((Integer) aux.get("identificador"));
                linhaModels.add(linhaModel);

            }
            if(aux.get("nome").equals("setor")){

                setoresFluxogramaModel.setNome((String)aux.get("nome"));
                setoresFluxogramaModel.setTexto((String)aux.get("texto"));
                setoresFluxogramaModel.setX((Integer) aux.get("x"));
                setoresFluxogramaModel.setY((Integer) aux.get("y"));
                setoresFluxogramaModel.setIdentificador((Integer) aux.get("identificador"));

            }


            if(aux.get("nome").equals("bolinha")){
                ConectorModel conectorModel = new ConectorModel();
                conectorModel.setNome((String)aux.get("nome"));
                conectorModel.setPosicaoX((Integer) aux.get("posicaoX"));
                conectorModel.setPosicaoY((Integer) aux.get("posicaoY"));
                conectorModel.setIdentificador((Integer) aux.get("identificador"));
                conectorModels.add(conectorModel);
            }

            if(aux.get("nome").equals("processoid")){

             String idpro = (String)(aux.get("idProcesso"));
             processosModel.setId(Long.parseLong(idpro));
            }
            if(aux.get("nome").equals("editar")){
                String idpro = (String)(aux.get("idProcesso"));
                this.figuraRepository.removeByProcessosModelId(Long.parseLong(idpro));
                this.linhaRepository.removeByProcessosModelId(Long.parseLong(idpro));
                this.conectorRepository.removeByProcessosModelId(Long.parseLong(idpro));
            }


        }
        this.salvarFigura(figuraModels,processosModel);
        this.salvarConector(conectorModels,processosModel);
        this.salvarLinha(linhaModels,processosModel);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @CrossOrigin
    @GetMapping(path = "/{id}")
    public ResponseEntity<?> FluxogramaId(@PathVariable("id") Long id) {
        return new ResponseEntity<>(fluxogramaRepository.getFluxograma(id), HttpStatus.OK);
    }

    public void salvarFigura(List<FiguraModel> figuraModels,ProcessosModel processosModel){
        for(FiguraModel figura : figuraModels){
            figura.setProcessosModel(processosModel);
            this.figuraRepository.save(figura);

        }
    }

    public void salvarConector(List<ConectorModel> conectorModels,ProcessosModel processosModel){
        for(ConectorModel conectorModel : conectorModels){
            conectorModel.setProcessosModel(processosModel);
            this.conectorRepository.save(conectorModel);

        }

    }

    public void salvarLinha(List<LinhaModel> linhaModels, ProcessosModel processosModel){
        for(LinhaModel linhaModel : linhaModels){
            linhaModel.setProcessosModel(processosModel);
            this.linhaRepository.save(linhaModel);

        }
    }


}
