package com.example.mapeamento.repository;

import com.example.mapeamento.model.UsuarioModel;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UsuarioRepository extends PagingAndSortingRepository<UsuarioModel, Long> {
}
