package com.example.mapeamento.endpoint;


import com.example.mapeamento.model.SetoresProcessosModel;
import com.example.mapeamento.repository.ProcessosSetoresRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("setor_processos")
public class SetorProcessosEndpoint {
    Long cont;

    @Autowired
    private ProcessosSetoresRepository setoresProcessosRepository;


    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, path = "/cadastrar")
    public ResponseEntity<?> processoSalvar(@RequestBody SetoresProcessosModel setoresProcessosModel) {
        if(setoresProcessosModel.getOrdem() == 0){
            Long id = setoresProcessosModel.getProcessosModel().getId();
            setoresProcessosRepository.deleteByProcessosModelId(id);
        }

        return new ResponseEntity<>(setoresProcessosRepository.save(setoresProcessosModel), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(path = "/{id}")
    public ResponseEntity<?> processoSetorID(@PathVariable("id") Long id) {
        List<SetoresProcessosModel> setorProcessos = setoresProcessosRepository.findByProcessosModelId(id);

        return new ResponseEntity<>(setorProcessos, HttpStatus.OK);
    }



    //criar um excluir em cascata


}
