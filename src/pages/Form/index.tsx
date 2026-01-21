/**
 * TODO:
 * preencher automaticamente o nome do cachorro se houver parâmetro
 * refatorar inputs, textArea, select, etc
 * revisar perguntas
 */

import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useSearchParams, Link } from "react-router";
import { ArrowLeft, CheckCircle, Send, AlertTriangle } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import HeroSmall from "../../components/HeroSmall";
import { Button } from "../../components/ui/Button";
import styles from "./Form.module.css";
import {
  Card,
  CardBody,
  CardContent,
  CardHeader,
  CardIcon,
  CardTitle,
} from "../../components/ui/Card";
import * as SelectComponent from "../../components/ui/Select";
import * as RadioComponent from "../../components/ui/RadioGroup";
import { Label } from "../../components/ui/Label";

export default function Form() {
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_ID);

  const [searchParams] = useSearchParams();
  const petName = searchParams.get("pet") || "";

  const [phone, setPhone] = useState("");

  // Estado para o Captcha
  const [captchaToken, setCaptchaToken] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    setPhone(value);
  };

  // Função chamada quando o usuário clica no "Não sou um robô"
  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token || "");
  };

  if (state.succeeded) {
    return (
      <main>
        <HeroSmall
          image="https://www.loverpets.com.br/cdn/shop/articles/Cachorrinho.jpg?v=1579380726"
          badge="Sucesso"
          title="Formulário Enviado!"
          description="Obrigado por responder com honestidade."
        />
        <div className="container">
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>
              <CheckCircle size={64} color="#27ae60" />
            </div>
            <h2>Recebemos suas respostas!</h2>
            <p>
              A equipe do Abrigo do Wlad vai analisar seu perfil com carinho.
              Entraremos em contato caso o perfil seja compatível com o animal
              escolhido.
            </p>

            <Link to="/adotar">
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<ArrowLeft size={20} />}
              >
                Voltar para Adoção
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <HeroSmall
        image="https://www.loverpets.com.br/cdn/shop/articles/Cachorrinho.jpg?v=1579380726"
        badge="Entrevista"
        title="Intenção de Adoção"
        description="Por favor, responda com sinceridade. Adoção é um ato de amor e responsabilidade."
      />

      <div className="container">
        <form onSubmit={handleSubmit} className={styles.longForm}>
          {/* --- AVISOS INICIAIS --- */}
          <Card variant="quote" size="lg">
            <CardBody>
              <CardHeader>
                <CardIcon>
                  <AlertTriangle size={35} />
                </CardIcon>
                <CardTitle>LEIA ANTES DE INICIAR</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  O preenchimento deste documento <strong>não garante</strong> a
                  adoção. Caso aprovada, as respostas serão anexadas ao Termo de
                  Responsabilidade.
                </p>
                <p>
                  Resgatar animais não é uma profissão e não recebemos auxílio
                  governamental. Todo trabalho é feito com recurso próprio.
                  Desta forma, pedimos{" "}
                  <strong>contribuição no valor de R$ 300,00</strong>. Esse
                  valor auxilia na alimentação, tratamento e castração.
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted" }}>
                  <strong>Requisitos e Considerações:</strong> Ter acima de 18
                  anos. Necessário condições financeiras (custo médio R$
                  300-400/mês). Pode levar meses para adaptar. Animais fazem
                  sujeira e precisam de veterinário.{" "}
                  <strong>Abandonar é crime!</strong>
                </p>
              </CardContent>
            </CardBody>
          </Card>

          <input
            type="hidden"
            name="_subject"
            value={`Nova Entrevista de Adoção: ${petName || "Geral"}`}
          />

          {/* SESSÃO 1: DADOS PESSOAIS */}
          <fieldset className={styles.section}>
            <legend>1. Dados Pessoais</legend>

            <div className={styles.field}>
              <label>1.1. Nome do adotante *</label>
              <input
                type="text"
                name="1_nome_adotante"
                required
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <div className={styles.field}>
                <label>1.2. Idade *</label>
                <input
                  type="number"
                  name="2_idade"
                  required
                  placeholder="Sua idade"
                  min="18"
                />
              </div>
              <div className={styles.field}>
                <label>1.3. Estado Civil *</label>
                <SelectComponent.Select required>
                  <SelectComponent.SelectTrigger>
                    <SelectComponent.SelectValue placeholder="Selecione" />
                  </SelectComponent.SelectTrigger>
                  <SelectComponent.SelectContent>
                    <SelectComponent.SelectItem value="Solteiro">
                      Solteiro (a)
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Casado/Uniao">
                      Casado (a) ou União Estável
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Solteiro">
                      Separado (a) ou divorciado (a)
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Viuvo">
                      Viúvo (a)
                    </SelectComponent.SelectItem>
                  </SelectComponent.SelectContent>
                </SelectComponent.Select>
              </div>
            </div>

            <div>
              <div className={styles.field}>
                <label>1.4. Profissão *</label>
                <input type="text" name="4_profissao" required />
              </div>
              <div className={styles.field}>
                <label>1.5. Empresa onde trabalha *</label>
                <input type="text" name="5_empresa" required />
              </div>
            </div>

            <div className={styles.field}>
              <label>1.6. Endereço completo (com bairro e cidade) *</label>
              <input
                type="text"
                name="6_endereco"
                required
                placeholder="Rua, Número, Bairro, Cidade..."
              />
            </div>

            <div>
              <div className={styles.field}>
                <label>1.7. Telefone para contato (WhatsApp) *</label>
                <input
                  type="text"
                  name="7_telefone"
                  required
                  placeholder="(XX) XXXXX-XXXX"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={15}
                />
              </div>
              <div className={styles.field}>
                <label>1.8. E-mail *</label>
                <input type="email" name="email_contato" required />
              </div>
            </div>

            <div className={styles.field}>
              <label>1.9. Qual(is) perfil(s) em redes sociais *</label>
              <input
                type="text"
                name="8_redes_sociais"
                required
                placeholder="Instagram / Facebook"
              />
            </div>
          </fieldset>

          {/* SESSÃO 2: FAMÍLIA */}
          <fieldset className={styles.section}>
            <legend>2. Composição Familiar e Renda</legend>

            <div>
              <div className={styles.field}>
                <label>2.1. Quantos adultos na casa? *</label>
                <input type="number" name="9_qtd_adultos" required />
              </div>
              <div className={styles.field}>
                <label>2.2. Quantas crianças? Quais idades? *</label>
                <input
                  type="text"
                  name="10_criancas"
                  required
                  placeholder="Se não tiver, coloque '0'. Se recebe visitas, especifique."
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>2.3. Renda Mensal da família *</label>
              <input
                type="text"
                name="renda_mensal"
                required
                placeholder="Ex: R$ 3.000,00"
              />
            </div>

            <div className={styles.field}>
              <label>2.4. Todos estão de acordo com a adoção? *</label>
              <RadioComponent.RadioGroup
                required
                name="11_acordo"
                className={styles.radioGroup}
              >
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem value="Sim" id="acordo_sim" />
                  <Label htmlFor="acordo_sim">Sim</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem value="Não" id="acordo_nao" />
                  <Label htmlFor="acordo_nao">Não</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Talvez"
                    id="acordo_talvez"
                  />
                  <Label htmlFor="acordo_talvez">Talvez</Label>
                </div>
              </RadioComponent.RadioGroup>
            </div>

            <div className={styles.field}>
              <label>
                2.5 Há alguém alérgico ou que não gosta de animais? Explique *
              </label>
              <textarea name="12_alergia" required rows={2}></textarea>
            </div>
          </fieldset>

          {/* SESSÃO 3: PERFIL DO ANIMAL */}
          <fieldset className={styles.section}>
            <legend>3. Sobre a Adoção</legend>

            <div className={styles.field}>
              <label>
                3.1. Por qual motivo decidiram ter um animalzinho? *
              </label>
              <textarea name="13_motivo" required rows={2}></textarea>
            </div>

            <div className={styles.field}>
              <label>3.2. Animal específico? Se sim, qual nome? *</label>
              <input
                type="text"
                name="14_animal_especifico"
                defaultValue={petName}
                required
              />
            </div>

            <div className={styles.subSection}>
              <h4>3.3. Preferências (Caso não tenha um específico)</h4>

              <div className={styles.subSectionField}>
                <label>3.3.1. Porte *</label>
                <SelectComponent.Select name="15a_porte" required>
                  <SelectComponent.SelectTrigger>
                    <SelectComponent.SelectValue placeholder="Selecione" />
                  </SelectComponent.SelectTrigger>
                  <SelectComponent.SelectContent>
                    <SelectComponent.SelectItem value="Nao Importa">
                      Não importa
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Mini">
                      Mini (até 4kgs)
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Pequeno">
                      Pequeno (5 a 10kgs)
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Pequeno Médio">
                      Pequeno para médio (11 a 14kgs)
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Medio">
                      Médio (15 a 20kgs)
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Grande">
                      Grande (mais de 21 kgs)
                    </SelectComponent.SelectItem>
                  </SelectComponent.SelectContent>
                </SelectComponent.Select>
              </div>

              <div className={styles.subSectionField}>
                <label>3.3.2. Sexo *</label>
                <RadioComponent.RadioGroup
                  name="15b_sexo"
                  defaultValue="Não importa"
                  className={styles.radioGroup}
                >
                  <div className={styles.radioOption}>
                    <RadioComponent.RadioGroupItem
                      value="Fêmea"
                      id="sexo_femea"
                    />
                    <Label htmlFor="sexo_femea">Só fêmea</Label>
                  </div>
                  <div className={styles.radioOption}>
                    <RadioComponent.RadioGroupItem
                      value="Macho"
                      id="sexo_macho"
                    />
                    <Label htmlFor="sexo_macho">Só macho</Label>
                  </div>
                  <div className={styles.radioOption}>
                    <RadioComponent.RadioGroupItem
                      value="Não importa"
                      id="sexo_nao_importa"
                    />
                    <Label htmlFor="sexo_nao_importa">Não importa</Label>
                  </div>
                </RadioComponent.RadioGroup>
              </div>

              <div className={styles.subSectionField}>
                <label>3.3.3. Idade *</label>
                <SelectComponent.Select name="15c_idade" required>
                  <SelectComponent.SelectTrigger>
                    <SelectComponent.SelectValue placeholder="Selecione" />
                  </SelectComponent.SelectTrigger>
                  <SelectComponent.SelectContent>
                    <SelectComponent.SelectItem value="Nao importa">
                      Não importa
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Filhote">
                      Filhote (4-11 meses)
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Adulto Jovem">
                      Adulto (1 a 5 anos)
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Adulto Maduro">
                      Adulto (6 a 9 anos)
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Idoso">
                      Idoso
                    </SelectComponent.SelectItem>
                  </SelectComponent.SelectContent>
                </SelectComponent.Select>
              </div>

              <div className={styles.subSectionField}>
                <label>3.3.4. Personalidade *</label>
                <SelectComponent.Select name="15d_personalidade" required>
                  <SelectComponent.SelectTrigger>
                    <SelectComponent.SelectValue placeholder="Selecione" />
                  </SelectComponent.SelectTrigger>
                  <SelectComponent.SelectContent>
                    <SelectComponent.SelectItem value="Brincalhao">
                      Brincalhão
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Super Ativo">
                      Super Ativo
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Independente">
                      Independente
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Carente">
                      Carente
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Grudinho">
                      Grudinho
                    </SelectComponent.SelectItem>
                    <SelectComponent.SelectItem value="Para Correr">
                      Que possa correr comigo
                    </SelectComponent.SelectItem>
                  </SelectComponent.SelectContent>
                </SelectComponent.Select>
              </div>
            </div>

            <div className={styles.subSectionField}>
              <label>3.3.5. Atividade principal do animal? *</label>
              <RadioComponent.RadioGroup
                name="16_atividade"
                required
                className={styles.radioGroup}
              >
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Companhia"
                    id="atividade_companhia"
                  />
                  <Label htmlFor="atividade_companhia">Companhia</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Guarda"
                    id="atividade_guarda"
                  />
                  <Label htmlFor="atividade_guarda">Guarda</Label>
                </div>
              </RadioComponent.RadioGroup>
            </div>
          </fieldset>

          {/* SESSÃO 4: ROTINA E MORADIA */}
          <fieldset className={styles.section}>
            <legend>4. Rotina e Moradia</legend>

            <div className={styles.field}>
              <label>4.1. Quem será o principal responsável do animal? *</label>
              <input type="text" name="17_responsavel" required />
            </div>

            <div className={styles.field}>
              <label>
                4.2. Quantas horas por dia o animal ficará sozinho? *
              </label>
              <input type="text" name="18_horas_sozinho" required />
            </div>

            <div className={styles.field}>
              <label>4.3. Pretende passear? Quantas vezes/horários? *</label>
              <input type="text" name="passeios" required />
            </div>

            <div className={styles.field}>
              <label>4.4. Sobre sua moradia: *</label>
              <RadioComponent.RadioGroup
                name="19_tipo_moradia"
                required
                className={styles.radioGroup}
              >
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Propria"
                    id="moradia_propria"
                  />
                  <Label htmlFor="moradia_propria">Própria</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Alugada"
                    id="moradia_alugada"
                  />
                  <Label htmlFor="moradia_alugada">Alugada</Label>
                </div>
              </RadioComponent.RadioGroup>
            </div>

            <div className={styles.field}>
              <label>4.5. Se alugada, proprietário permite animais?</label>
              <RadioComponent.RadioGroup
                name="19a_proprietario"
                defaultValue="Nao aplica"
                className={styles.radioGroup}
              >
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Sim"
                    id="proprietario_sim"
                  />
                  <Label htmlFor="proprietario_sim">Sim</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Não"
                    id="proprietario_nao"
                  />
                  <Label htmlFor="proprietario_nao">Não</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Nao sei"
                    id="proprietario_nao_sei"
                  />
                  <Label htmlFor="proprietario_nao_sei">Não sei</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Nao aplica"
                    id="proprietario_nao_aplica"
                  />
                  <Label htmlFor="proprietario_nao_aplica">
                    Minha casa é própria
                  </Label>
                </div>
              </RadioComponent.RadioGroup>
            </div>

            <div className={styles.field}>
              <label>4.6. Detalhes da moradia: *</label>
              <SelectComponent.Select name="20_detalhes_moradia" required>
                <SelectComponent.SelectTrigger>
                  <SelectComponent.SelectValue placeholder="Selecione" />
                </SelectComponent.SelectTrigger>
                <SelectComponent.SelectContent>
                  <SelectComponent.SelectItem value="Casa quintal">
                    Casa com quintal
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Casa quintal compartilhado">
                    Casa com quintal Compartilhado
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Casa sem quintal">
                    Casa sem quintal
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Muros altos">
                    Casa com muros altos
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Com Telas">
                    Casa com Telas nas janelas
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Portao Fechado">
                    Telas no portão ou portão totalmente fechado
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Tudo fechado">
                    Não tenho muros altos/telas mas deixarei tudo fechado
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Ap telas total">
                    Apartamento com telas em todas as janelas
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Ap telas parcial">
                    Apartamento com telas exceto basculantes
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Ap sem telas">
                    Apartamento sem telas e não colocarei
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Ap colocarei">
                    Apartamento sem telas mas colocarei
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Ap varanda fechada">
                    Apartamento com varanda fechada
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Ap varanda aberta">
                    Apartamento com varanda aberta
                  </SelectComponent.SelectItem>
                </SelectComponent.SelectContent>
              </SelectComponent.Select>
            </div>

            <div className={styles.field}>
              <label>4.7. Quem mora na casa/ap? *</label>
              <input
                type="text"
                name="21_moradores"
                placeholder="Cônjuges, Filhos, Avós..."
                required
              />
            </div>

            <div className={styles.field}>
              <label>4.8. Em quais áreas o animal poderá frequentar? *</label>
              <input type="text" name="22_areas_frequentar" required />
            </div>

            <div className={styles.field}>
              <label>
                4.9. Em quais períodos poderá frequentar as áreas acima? *
              </label>
              <input type="text" name="23_periodos" required />
            </div>

            <div className={styles.field}>
              <label>4.10. Onde o animal irá dormir? *</label>
              <input type="text" name="24_dormir" required />
            </div>

            <div className={styles.field}>
              <label>4.11. Acesso a cômodos: *</label>
              <SelectComponent.Select name="25_acesso" required>
                <SelectComponent.SelectTrigger>
                  <SelectComponent.SelectValue placeholder="Selecione" />
                </SelectComponent.SelectTrigger>
                <SelectComponent.SelectContent>
                  <SelectComponent.SelectItem value="Total">
                    Acesso total
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Parcial">
                    Acesso total exceto alguns cômodos
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Restrito">
                    Somente varanda/quintal
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Outro">
                    Outro
                  </SelectComponent.SelectItem>
                </SelectComponent.SelectContent>
              </SelectComponent.Select>
            </div>
          </fieldset>

          {/* SESSÃO 5: HISTÓRICO DE ANIMAIS */}
          <fieldset className={styles.section}>
            <legend>5. Histórico e Veterinário</legend>

            <div className={styles.field}>
              <label>5.1. Tem outros animais? Quantos/Quais? *</label>
              <input type="text" name="26_outros_animais" required />
            </div>

            <div className={styles.field}>
              <label>5.2. Se tem, estão castrados? *</label>
              <input type="text" name="27_castrados" required />
            </div>

            <div className={styles.field}>
              <label>5.3. Já teve outros animais? Quantos/Quais? *</label>
              <input type="text" name="28_ja_teve" required />
            </div>

            <div className={styles.field}>
              <label>
                5.4. O que aconteceu com os antigos? (Se morreram, causa da
                morte) *
              </label>
              <textarea
                name="29_destino_antigos"
                required
                rows={2}
                placeholder="Responda mesmo que tenha convivido na casa dos pais"
              ></textarea>
            </div>

            <div className={styles.field}>
              <label>5.5. Qual veterinário/clínica pretende usar? *</label>
              <input type="text" name="30_veterinario" required />
            </div>

            <div className={styles.field}>
              <label>5.6. Qual marca de ração pretende usar? *</label>
              <input type="text" name="31_racao" required />
            </div>
          </fieldset>

          {/* SESSÃO 6: COMPROMISSO */}
          <fieldset className={styles.section}>
            <legend>6. Responsabilidades e Custos</legend>

            <div className={styles.field}>
              <label>
                6.1. Concorda com uso de coleira de identificação (Placa)? *
              </label>
              <RadioComponent.RadioGroup
                name="32_coleira"
                required
                className={styles.radioGroup}
              >
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem value="Sim" id="coleira_sim" />
                  <Label htmlFor="coleira_sim">Sim</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem value="Não" id="coleira_nao" />
                  <Label htmlFor="coleira_nao">Não</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Talvez"
                    id="coleira_talvez"
                  />
                  <Label htmlFor="coleira_talvez">Talvez</Label>
                </div>
              </RadioComponent.RadioGroup>
            </div>

            <div className={styles.field}>
              <label>6.2. Ciente que o animal passa por adaptação? *</label>
              <RadioComponent.RadioGroup
                name="33_ciencia_adaptacao"
                required
                className={styles.radioGroup}
              >
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Sim"
                    id="adaptacao_sim"
                  />
                  <Label htmlFor="adaptacao_sim">Sim</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Não"
                    id="adaptacao_nao"
                  />
                  <Label htmlFor="adaptacao_nao">Não</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Talvez"
                    id="adaptacao_talvez"
                  />
                  <Label htmlFor="adaptacao_talvez">Talvez</Label>
                </div>
              </RadioComponent.RadioGroup>
            </div>

            <div className={styles.field}>
              <label>6.3. Quanto tempo espera para adaptação? *</label>
              <input type="text" name="34_tempo_adaptacao" required />
            </div>

            <div className={styles.field}>
              <label>6.4. Disposto a contratar adestrador se precisar? *</label>
              <RadioComponent.RadioGroup
                name="35_adestrador"
                required
                className={styles.radioGroup}
              >
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Sim"
                    id="adestrador_sim"
                  />
                  <Label htmlFor="adestrador_sim">Sim</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Não"
                    id="adestrador_nao"
                  />
                  <Label htmlFor="adestrador_nao">Não</Label>
                </div>
              </RadioComponent.RadioGroup>
            </div>

            <div className={styles.field}>
              <label>6.5. Se não contratar, qual motivo? *</label>
              <SelectComponent.Select name="36_motivo_nao_adestrar">
                <SelectComponent.SelectTrigger>
                  Selecione...
                </SelectComponent.SelectTrigger>
                <SelectComponent.SelectContent>
                  <SelectComponent.SelectItem value="Nao se aplica">
                    Não se aplica (contratarei)
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Eu ensinarei">
                    Eu mesmo ensinarei
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Muito caro">
                    É muito caro
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Nao acredito">
                    Não acredito em adestramento
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Outro">
                    Outro
                  </SelectComponent.SelectItem>
                </SelectComponent.SelectContent>
              </SelectComponent.Select>
            </div>

            <div>
              <div className={styles.field}>
                <label>6.6. Possui carro? *</label>
                <RadioComponent.RadioGroup
                  name="37_carro"
                  required
                  className={styles.radioGroup}
                >
                  <div className={styles.radioOption}>
                    <RadioComponent.RadioGroupItem value="Sim" id="carro_sim" />
                    <Label htmlFor="carro_sim">Sim</Label>
                  </div>
                  <div className={styles.radioOption}>
                    <RadioComponent.RadioGroupItem value="Não" id="carro_nao" />
                    <Label htmlFor="carro_nao">Não</Label>
                  </div>
                </RadioComponent.RadioGroup>
              </div>
            </div>

            <div className={styles.field}>
              <label>6.7. Em emergência, pode levar ao veterinário? *</label>
              <SelectComponent.Select name="38_financeiro_vet" required>
                <SelectComponent.SelectTrigger>
                  <SelectComponent.SelectValue placeholder="Selecione..." />
                </SelectComponent.SelectTrigger>
                <SelectComponent.SelectContent>
                  <SelectComponent.SelectItem value="Sim">
                    Sim, com certeza
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Nao">
                    Não, no momento não posso ter gastos extras
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Plano">
                    Sim, porque contratarei plano de saúde
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Publico">
                    Sim, levarei em hospital público
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Outro">
                    Outro
                  </SelectComponent.SelectItem>
                </SelectComponent.SelectContent>
              </SelectComponent.Select>
            </div>

            <div className={styles.field}>
              <label>
                6.8. Concorda em vacinar/vermifugar periodicamente? *
              </label>
              <RadioComponent.RadioGroup
                name="39_vacinas"
                required
                className={styles.radioGroup}
              >
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem value="Sim" id="vacinas_sim" />
                  <Label htmlFor="vacinas_sim">Sim</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem value="Não" id="vacinas_nao" />
                  <Label htmlFor="vacinas_nao">Não</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Talvez"
                    id="vacinas_talvez"
                  />
                  <Label htmlFor="vacinas_talvez">Talvez</Label>
                </div>
              </RadioComponent.RadioGroup>
            </div>

            <div className={styles.field}>
              <label>6.9. Previsão de gasto mensal: *</label>
              <SelectComponent.Select name="40_gasto_mensal" required>
                <SelectComponent.SelectTrigger>
                  <SelectComponent.SelectValue placeholder="Selecione..." />
                </SelectComponent.SelectTrigger>
                <SelectComponent.SelectContent>
                  <SelectComponent.SelectItem value="100-150">
                    entre 100,00 e 150,00
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="150-250">
                    entre 150,00 e 250,00
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="250-300">
                    entre 250 e 300,00
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="acima 300">
                    acima de 300,00
                  </SelectComponent.SelectItem>
                  <SelectComponent.SelectItem value="Outro">
                    Outro
                  </SelectComponent.SelectItem>
                </SelectComponent.SelectContent>
              </SelectComponent.Select>
            </div>
          </fieldset>

          {/* SESSÃO 7: TERMOS FINAIS */}
          <fieldset className={styles.section}>
            <legend>7. Termos Finais</legend>

            <div className={styles.field}>
              <label>7.1. Onde viu a divulgação? (Qual perfil?) *</label>
              <input type="text" name="41_divulgacao" required />
            </div>

            <div className={styles.field}>
              <label>7.2. Aceita mandar notícias (fotos/vídeos)? *</label>
              <RadioComponent.RadioGroup
                name="42_noticias"
                required
                className={styles.radioGroup}
              >
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Sim"
                    id="noticias_sim"
                  />
                  <Label htmlFor="noticias_sim">Sim</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Não"
                    id="noticias_nao"
                  />
                  <Label htmlFor="noticias_nao">Não</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Talvez"
                    id="noticias_talvez"
                  />
                  <Label htmlFor="noticias_talvez">Talvez</Label>
                </div>
              </RadioComponent.RadioGroup>
            </div>

            <div className={styles.field}>
              <label>7.3. Aceita visitas do protetor? *</label>
              <RadioComponent.RadioGroup
                name="visitas"
                required
                className={styles.radioGroup}
              >
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem value="Sim" id="visitas_sim" />
                  <Label htmlFor="visitas_sim">Sim</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem value="Não" id="visitas_nao" />
                  <Label htmlFor="visitas_nao">Não</Label>
                </div>
              </RadioComponent.RadioGroup>
            </div>

            <div className={styles.field}>
              <label>7.4. Permite divulgarmos fotos da adoção? *</label>
              <RadioComponent.RadioGroup
                name="43_fotos_adocao"
                required
                className={styles.radioGroup}
              >
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Sim"
                    id="fotos_adocao_sim"
                  />
                  <Label htmlFor="fotos_adocao_sim">Sim</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Não"
                    id="fotos_adocao_nao"
                  />
                  <Label htmlFor="fotos_adocao_nao">Não</Label>
                </div>
              </RadioComponent.RadioGroup>
            </div>

            <div className={styles.field}>
              <label>7.5. Concorda com a contribuição de R$ 300,00? *</label>
              <RadioComponent.RadioGroup
                name="44_contribuicao"
                required
                className={styles.radioGroup}
              >
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Sim"
                    id="contribuicao_sim"
                  />
                  <Label htmlFor="contribuicao_sim">Sim</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Não"
                    id="contribuicao_nao"
                  />
                  <Label htmlFor="contribuicao_nao">Não</Label>
                </div>
              </RadioComponent.RadioGroup>
            </div>

            <div className={styles.field}>
              <label>7.6. Ciente que vivem 15+ anos? Preparado? *</label>
              <RadioComponent.RadioGroup
                name="45_compromisso_vida"
                required
                className={styles.radioGroup}
              >
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Sim"
                    id="compromisso_sim"
                  />
                  <Label htmlFor="compromisso_sim">Sim</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Não"
                    id="compromisso_nao"
                  />
                  <Label htmlFor="compromisso_nao">Não</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Talvez"
                    id="compromisso_talvez"
                  />
                  <Label htmlFor="compromisso_talvez">Talvez</Label>
                </div>
              </RadioComponent.RadioGroup>
            </div>
          </fieldset>

          {/* SESSÃO 8: SITUAÇÕES HIPOTÉTICAS */}
          <fieldset className={styles.section}>
            <legend>8. O que acontecerá se...</legend>
            <p className={styles.helperText}>
              Responda com detalhes. Questões para reflexão.
            </p>

            <div className={styles.field}>
              <label>8.1. Alguém engravidar? *</label>
              <textarea name="46a_gravidez" required rows={2}></textarea>
            </div>
            <div className={styles.field}>
              <label>8.2. A família viajar? *</label>
              <textarea name="46b_viagem" required rows={2}></textarea>
            </div>
            <div className={styles.field}>
              <label>8.3. Mudança para casa menor? *</label>
              <textarea name="46c_mudanca_menor" required rows={2}></textarea>
            </div>
            <div className={styles.field}>
              <label>8.4. Mudança de cidade/país? *</label>
              <textarea name="46d_mudanca_longe" required rows={2}></textarea>
            </div>
            <div className={styles.field}>
              <label>8.5. Separação do casal? *</label>
              <textarea name="46e_separacao" required rows={2}></textarea>
            </div>
            <div className={styles.field}>
              <label>8.6. Falecimento do responsável? *</label>
              <textarea name="46f_falecimento" required rows={2}></textarea>
            </div>
          </fieldset>

          {/* SESSÃO 9: O QUE FARIA SE... */}
          <fieldset className={styles.section}>
            <legend>9. O que faria se o animal...</legend>
            <div className={styles.field}>
              <label>9.1. Se perdesse? *</label>
              <input type="text" name="47a_perder" required />
            </div>
            <div className={styles.field}>
              <label>9.2. Adoecesse/Acidente? *</label>
              <input type="text" name="47b_doenca" required />
            </div>
            <div className={styles.field}>
              <label>9.3. Mordesse alguém? *</label>
              <input type="text" name="47c_morder" required />
            </div>
            <div className={styles.field}>
              <label>9.4. Destruísse objetos de valor? *</label>
              <input type="text" name="47d_destruicao" required />
            </div>
            <div className={styles.field}>
              <label>9.5. Fizesse necessidades no lugar errado? *</label>
              <input type="text" name="47e_xixi_errado" required />
            </div>
          </fieldset>

          {/* FINALIZAÇÃO */}
          <fieldset className={styles.section}>
            <legend>10. Finalização</legend>
            <div className={styles.field}>
              <label>10.1. O que vai comprar para recebê-lo? *</label>
              <textarea name="48_enxoval" required rows={2}></textarea>
            </div>
            <div className={styles.field}>
              <label>10.2. Em que condição devolveria o animal? *</label>
              <textarea name="49_devolucao" required rows={2}></textarea>
            </div>

            <Card style={{margin: "1.5rem 0"}} variant="quote" size="sm">
              <CardBody>
                <CardHeader>
                  <CardTitle>IMPORTANTE!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Você não poderá doar a outra pessoa o animal adotado sem
                    antes comunicar sua intenção ao protetor.
                  </p>
                </CardContent>
              </CardBody>
            </Card>

            <div className={styles.field}>
              <label>10.3. Concorda com o termo acima? *</label>
              <RadioComponent.RadioGroup
                name="termo_nao_repassar"
                required
                className={styles.radioGroup}
              >
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Sim"
                    id="termo_repassar_sim"
                  />
                  <Label htmlFor="termo_repassar_sim">Sim</Label>
                </div>
                <div className={styles.radioOption}>
                  <RadioComponent.RadioGroupItem
                    value="Não"
                    id="termo_repassar_nao"
                  />
                  <Label htmlFor="termo_repassar_nao">Não</Label>
                </div>
              </RadioComponent.RadioGroup>
            </div>

            <div className={styles.field}>
              <label>10.4. Espaço para observações</label>
              <textarea name="50_obs" rows={3}></textarea>
            </div>

            {/* --- ÁREA DO CAPTCHA --- */}
            <div
              className={styles.field}
              style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ReCAPTCHA
                sitekey="6LeHu0ksAAAAAMrICH8bmO4MD0r2wdnJ9AZVpWlF"
                onChange={handleCaptchaChange}
              />
              <input
                type="hidden"
                name="g-recaptcha-response"
                value={captchaToken}
              />
            </div>
          </fieldset>

          <div className={styles.formFooter}>
            <Button
              type="submit"
              size="lg"
              disabled={state.submitting || !captchaToken}
              rightIcon={<Send size={18} />}
            >
              {state.submitting ? "Enviando..." : "Enviar Respostas"}
            </Button>
          </div>

          <ValidationError errors={state.errors} />
        </form>
      </div>
    </main>
  );
}
