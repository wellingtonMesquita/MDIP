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

    @Autowired
    private ProcessosSetoresRepository setoresProcessosRepository;


    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, path = "/cadastrar")
    public ResponseEntity<?> processoSalvar(@RequestBody SetoresProcessosModel setoresProcessosModel) {
        return new ResponseEntity<>(setoresProcessosRepository.save(setoresProcessosModel), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(path = "/{id}")
    public ResponseEntity<?> processoSetorID(@PathVariable("id") Long id) {
        List<SetoresProcessosModel> setorProcessos = setoresProcessosRepository.findByProcessosModelId(id);

        return new ResponseEntity<>(setorProcessos, HttpStatus.OK);
    }


}
