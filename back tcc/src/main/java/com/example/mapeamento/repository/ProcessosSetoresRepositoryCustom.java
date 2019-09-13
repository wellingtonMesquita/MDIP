package com.example.mapeamento.repository;

import com.example.mapeamento.model.PagePersonalizado;
import com.example.mapeamento.vo.ProcessosVO;
import org.springframework.data.domain.Pageable;

public interface ProcessosSetoresRepositoryCustom {
    PagePersonalizado getfiltro(ProcessosVO processosVO);

}
