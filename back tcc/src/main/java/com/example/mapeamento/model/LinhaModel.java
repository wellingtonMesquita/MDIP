package com.example.mapeamento.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class LinhaModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn()
    @JsonIgnore
    private ProcessosModel processosModel;

    private String nome;
    private Integer posicaoX;
    private Integer posicaoY;
    private Integer posicaoIX;
    private Integer posicaoIY;
    private Integer identificador;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProcessosModel getProcessosModel() {
        return processosModel;
    }

    public void setProcessosModel(ProcessosModel processosModel) {
        this.processosModel = processosModel;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getPosicaoX() {
        return posicaoX;
    }

    public void setPosicaoX(Integer posicaoX) {
        this.posicaoX = posicaoX;
    }

    public Integer getPosicaoY() {
        return posicaoY;
    }

    public void setPosicaoY(Integer posicaoY) {
        this.posicaoY = posicaoY;
    }

    public Integer getPosicaoIX() {
        return posicaoIX;
    }

    public void setPosicaoIX(Integer posicaoIX) {
        this.posicaoIX = posicaoIX;
    }

    public Integer getPosicaoIY() {
        return posicaoIY;
    }

    public void setPosicaoIY(Integer posicaoIY) {
        this.posicaoIY = posicaoIY;
    }

    public Integer getIdentificador() {
        return identificador;
    }

    public void setIdentificador(Integer identificador) {
        this.identificador = identificador;
    }
}
