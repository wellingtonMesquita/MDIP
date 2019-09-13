package com.example.mapeamento.endpoint;

import com.example.mapeamento.model.UsuarioModel;
import com.example.mapeamento.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("usuario")
public class UsuarioEndpoint {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @RequestMapping(method = RequestMethod.POST, path = "/cadastrar")
    public ResponseEntity<?> usuarioSalvar(@RequestBody UsuarioModel usuarioModel){
        return new ResponseEntity<>(usuarioRepository.save(usuarioModel), HttpStatus.OK);
    }




}
