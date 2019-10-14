package com.example.mapeamento.repository;

import com.example.mapeamento.model.FiguraModel;
import org.springframework.data.repository.PagingAndSortingRepository;

import javax.transaction.Transactional;
import javax.validation.constraints.Max;
import java.util.List;

public interface FiguraRepository extends PagingAndSortingRepository<FiguraModel, Long> {

    @Transactional
   List<FiguraModel> removeByProcessosModelId(Long id);

}
