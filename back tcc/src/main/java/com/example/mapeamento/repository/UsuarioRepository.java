package com.example.mapeamento.repository;

import com.example.mapeamento.model.FiguraModel;
import com.example.mapeamento.model.UsuarioModel;
import org.springframework.data.repository.PagingAndSortingRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface UsuarioRepository extends PagingAndSortingRepository<UsuarioModel, Long> {

   UsuarioModel findByNomeUsuarioAndPassword(String nomeusuario, String password);

}
