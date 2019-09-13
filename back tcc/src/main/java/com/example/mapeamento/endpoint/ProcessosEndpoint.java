package com.example.mapeamento.endpoint;

import com.example.mapeamento.model.ProcessosModel;
import com.example.mapeamento.repository.ProcessosRepository;
import com.example.mapeamento.repository.ProcessosSetoresRepository;
import com.example.mapeamento.vo.ProcessosVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("processos")
public class ProcessosEndpoint {

    @Autowired
    private ProcessosRepository processosRepository;

    @Autowired
    private ProcessosSetoresRepository processosSetoresRepository;


    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, path = "/listar2")
    public ResponseEntity<?> listAll(Pageable pageable) {
        return new ResponseEntity<>(processosRepository.findAll(pageable), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, path = "/cadastrar")
    public ResponseEntity<?> processoSalvar(@RequestBody ProcessosModel processomodel) {
        return new ResponseEntity<>(processosRepository.save(processomodel), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, path = "/filtro")
    public ResponseEntity<?> filtroProcesso(@RequestBody ProcessosModel processosModel) {
        return null;
    }

    @CrossOrigin
    @GetMapping(path = "/{id}")
    public ResponseEntity<?> processoID(@PathVariable("id") Long id) {
        Optional<ProcessosModel> processosModel = processosRepository.findById(id);
        if (processosModel == null) {
        }
        return new ResponseEntity<>(processosModel, HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping
    public ResponseEntity<?> processoEdit(@RequestBody ProcessosModel processosModel){
        processosRepository.save(processosModel);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @CrossOrigin
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> processoDelete(@PathVariable("id") Long id ){
        processosRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, path = "/listar")
    public ResponseEntity<?> listAll2(@RequestBody ProcessosVO processosVO) {
        return new ResponseEntity<>(processosSetoresRepository.getfiltro(processosVO), HttpStatus.OK);
    }



}
