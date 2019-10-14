package com.example.mapeamento.repository;

import com.example.mapeamento.model.FiguraModel;
import com.example.mapeamento.model.LinhaModel;
import org.springframework.data.repository.PagingAndSortingRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface LinhaRepository extends PagingAndSortingRepository<LinhaModel, Long> {
    @Transactional
    List<LinhaModel> removeByProcessosModelId(Long id);

}
