package com.example.mapeamento.repository;

import com.example.mapeamento.model.ProcessosModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProcessosRepository extends PagingAndSortingRepository<ProcessosModel, Long>{



}
