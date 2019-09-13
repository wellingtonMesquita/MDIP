package com.example.mapeamento.repository;

import com.example.mapeamento.model.FiguraModel;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface FiguraRepository extends PagingAndSortingRepository<FiguraModel, Long> {
}
