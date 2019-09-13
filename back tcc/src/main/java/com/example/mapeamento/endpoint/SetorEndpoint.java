package com.example.mapeamento.endpoint;


import com.example.mapeamento.model.SetorModel;
import com.example.mapeamento.repository.SetorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("setor")
public class SetorEndpoint {

    @Autowired
    private SetorRepository setorRepository;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, path = "/cadastrar")
    public ResponseEntity<?> setorSalvar(@RequestBody SetorModel setorModel) {
        return new ResponseEntity<>(setorRepository.save(setorModel), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, path = "/listar")
    public ResponseEntity<?> listAll() {
        return new ResponseEntity<>(setorRepository.findAll(), HttpStatus.OK);
    }
}
