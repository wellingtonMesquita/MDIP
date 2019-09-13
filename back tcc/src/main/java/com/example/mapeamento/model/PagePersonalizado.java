package com.example.mapeamento.model;

import java.util.ArrayList;
import java.util.List;

public class PagePersonalizado {
    List content = new ArrayList();
    Integer number;
    Integer totalPages;

    public List getContent() {
        return content;
    }

    public void setContent(List content) {
        this.content = content;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }
}
