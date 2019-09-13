package com.example.mapeamento.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class SetoresProcessosModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne()
    @JoinColumn()
    private ProcessosModel processosModel;

    @ManyToOne()
    @JoinColumn()
    private SetorModel setorModel;

    private Integer ordem;


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

    public SetorModel getSetorModel() {
        return setorModel;
    }

    public void setSetorModel(SetorModel setorModel) {
        this.setorModel = setorModel;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getOrdem() {
        return ordem;
    }

    public void setOrdem(Integer ordem) {
        this.ordem = ordem;
    }
}
