package com.example.mapeamento.repository;

import com.example.mapeamento.model.ConectorModel;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TextoRepository extends PagingAndSortingRepository<ConectorModel, Long> {
}
