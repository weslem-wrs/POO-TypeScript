class Aluno {
    private nome: string;
    private disciplinas: Map<string, Disciplina>;
    constructor(nome: string) {
        this.nome = nome;
        this.disciplinas = new Map<string, Disciplina>();
    }
    public getNome(): string {
        return this.nome;
    }
    public addDisciplina(disciplina: Disciplina): void {
        let chave = disciplina.getNome();
        if (this.disciplinas.has(chave))
            return;
        this.disciplinas.set(chave, disciplina);
        disciplina.addAluno(this);
    }

    public removeDisciplina(key: string): void {
        let disciplina: undefined | Disciplina = this.disciplinas.get(key);
        if (disciplina !== undefined) {
            this.disciplinas.delete(key);
            disciplina.removeAluno(this.nome);
        }
    }

    public getDisciplinas(): string[] {
        return [...this.disciplinas.keys()];
    }


    public toString(): string {
        let keys = this.disciplinas.keys();
        return this.nome + " [" + [...keys].join(", ") + "]";
    }
}

class Disciplina {
    private nome: string;
    private alunos: Map<string, Aluno>;
    constructor(nome: string) {
        this.nome = nome;
        this.alunos = new Map<string, Aluno>();
    }
    public getNome(): string {
        return this.nome;
    }
    public addAluno(aluno: Aluno): void {
        let chave = aluno.getNome();
        if (this.alunos.has(chave))
            return;
        this.alunos.set(chave, aluno);
        aluno.addDisciplina(this);
    }

    public removeAluno(key: string): void {
        let aluno: Aluno | undefined = this.alunos.get(key);
        if (aluno !== undefined) {
            this.alunos.delete(key);
            aluno.removeDisciplina(this.nome);
        }
    }

    public getAlunos(): string[] {
        return [...this.alunos.keys()];
    }

    public toString(): string {
        let keys = this.alunos.keys();
        return this.nome + " [" + [...keys].join(", ") + "]";
    }
}

//adicionar, guardar, obter e remover alunos e disciplinas

class Universidade {
    private alunos: Map<string, Aluno>;
    private disciplinas: Map<string, Disciplina>;
    constructor() {
        this.alunos = new Map<string, Aluno>();
        this.disciplinas = new Map<string, Disciplina>();
    }
    public addAluno(aluno: Aluno): void {
        let chave = aluno.getNome();
        if (this.alunos.has(chave))
            return;
        this.alunos.set(chave, aluno);
    }

    public addDisciplina(disciplina: Disciplina): void {
        let chave = disciplina.getNome();
        if (this.disciplinas.has(chave))
            return;
        this.disciplinas.set(chave, disciplina);
    }

    public getAluno(nome: string): Aluno {
        let aluno: undefined | Aluno = this.alunos.get(nome);
        if (aluno === undefined)
            throw new Error("Aluno não encontrado");
        return aluno;
    }

    public getDisciplina(nome: string): Disciplina {
        let disciplina =  this.disciplinas.get(nome);
        if (disciplina === undefined)
            throw new Error("Disciplina não encontrada");
        return disciplina;
    }

    public removerAluno(nome: string): void {
        let aluno = this.getAluno(nome);
        for (let disc of aluno.getDisciplinas()) {
            aluno.removeDisciplina(disc);
        }
        this.alunos.delete(nome);
    }

    public removerDisciplina(nome: string): void {
        let disciplina = this.getDisciplina(nome);

        for (let aluno of disciplina.getAlunos()) {
            disciplina.removeAluno(aluno);
        }

        this.disciplinas.delete(nome);
    }

    public vincular(nome_aluno: string, nome_disciplina: string): void {
        let aluno = this.getAluno(nome_aluno);
        let discp = this.getDisciplina(nome_disciplina);
        aluno.addDisciplina(discp);
    }

    public desvincular(nome_aluno: string, nome_disciplina: string): void {
        this.getAluno(nome_aluno).removeDisciplina(nome_disciplina);
    }

    public toString(): string {
        let alunos = [...this.alunos.values()].map(a => a.toString());
        let discip = [...this.disciplinas.values()].map(d => d.toString());
        return "--Alunos:\n" + alunos.join("\n") + "\n--Disciplinas:\n" + discip.join("\n");
    }
}

let univ = new Universidade();
univ.addAluno(new Aluno("joao"));
univ.addAluno(new Aluno("maria"));
univ.addAluno(new Aluno("pedro"));

univ.addDisciplina(new Disciplina("desenho"));
univ.addDisciplina(new Disciplina("arte"));
univ.addDisciplina(new Disciplina("kungfu"));

univ.vincular("joao", "desenho");
univ.vincular("maria", "arte");
univ.vincular("maria", "kungfu");
univ.vincular("pedro", "kungfu");

console.log(univ.toString());

univ.removerDisciplina("kungfu");

console.log(univ.toString());