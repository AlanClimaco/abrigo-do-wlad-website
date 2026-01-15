import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useSearchParams, Link } from "react-router";
import { ArrowLeft, CheckCircle, Send, AlertTriangle } from "lucide-react";
import HeroSmall from "../../components/HeroSmall";
import { Button } from "../../components/ui/Button";
import styles from "./Form.module.css";

export default function Form() {
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_ID);
  
  const [searchParams] = useSearchParams();
  const petName = searchParams.get("pet") || "";
  
  const [phone, setPhone] = useState("");

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
              Entraremos em contato caso o perfil seja compatível com o animal escolhido.
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
          <div className={styles.introBox}>
            <div className={styles.warningHeader}>
              <AlertTriangle size={24} />
              <h3>LEIA ANTES DE INICIAR</h3>
            </div>
            <p>
              O preenchimento deste documento <strong>não garante</strong> a adoção. Caso aprovada, as respostas serão anexadas ao Termo de Responsabilidade.
            </p>
            <p>
              Resgatar animais não é uma profissão e não recebemos auxílio governamental. Todo trabalho é feito com recurso próprio.
              Desta forma, pedimos <strong>contribuição no valor de R$ 300,00</strong>. Esse valor auxilia na alimentação, tratamento e castração.
            </p>
            <hr />
            <p className={styles.smallText}>
              <strong>Requisitos:</strong> Ter acima de 18 anos. Necessário condições financeiras (custo médio R$ 300-400/mês). 
              Pode levar meses para adaptar. Animais fazem sujeira e precisam de veterinário. Abandonar é crime!
            </p>
          </div>

          <input type="hidden" name="_subject" value={`Nova Entrevista de Adoção: ${petName || "Geral"}`} />

          {/* SESSÃO 1: DADOS PESSOAIS */}
          <fieldset className={styles.section}>
            <legend>1. Dados Pessoais</legend>
            
            <div className={styles.field}>
              <label>1. Nome do adotante *</label>
              <input type="text" name="1_nome_adotante" required placeholder="Seu nome completo" />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>2. Idade *</label>
                <input type="number" name="2_idade" required placeholder="Sua idade" min="18" />
              </div>
              <div className={styles.field}>
                <label>3. Estado Civil *</label>
                <select name="3_estado_civil" required>
                  <option value="">Selecione...</option>
                  <option value="Solteiro">Solteiro (a)</option>
                  <option value="Casado/Uniao">Casado (a) ou União Estável</option>
                  <option value="Separado">Separado (a) ou divorciado (a)</option>
                  <option value="Viuvo">Viúvo (a)</option>
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>4. Profissão *</label>
                <input type="text" name="4_profissao" required />
              </div>
              <div className={styles.field}>
                <label>5. Empresa onde trabalha *</label>
                <input type="text" name="5_empresa" required />
              </div>
            </div>

            <div className={styles.field}>
              <label>6. Endereço completo (com bairro e cidade) *</label>
              <input type="text" name="6_endereco" required placeholder="Rua, Número, Bairro, Cidade..." />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>7. Telefone para contato (WhatsApp) *</label>
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
                <label>E-mail *</label>
                <input type="email" name="email_contato" required />
              </div>
            </div>

            <div className={styles.field}>
              <label>8. Qual(is) perfil(s) em redes sociais *</label>
              <input type="text" name="8_redes_sociais" required placeholder="Instagram / Facebook" />
            </div>
          </fieldset>

          {/* SESSÃO 2: FAMÍLIA */}
          <fieldset className={styles.section}>
            <legend>2. Composição Familiar e Renda</legend>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>9. Quantos adultos na casa? *</label>
                <input type="number" name="9_qtd_adultos" required />
              </div>
              <div className={styles.field}>
                <label>10. Quantas crianças? Quais idades? *</label>
                <input type="text" name="10_criancas" required placeholder="Se não tiver, coloque '0'. Se recebe visitas, especifique." />
              </div>
            </div>

            <div className={styles.field}>
              <label>Renda Mensal da família *</label>
              <input type="text" name="renda_mensal" required placeholder="Ex: R$ 3.000,00" />
            </div>

            <div className={styles.field}>
              <label>11. Todos estão de acordo com a adoção? *</label>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="11_acordo" value="Sim" required /> Sim</label>
                <label><input type="radio" name="11_acordo" value="Não" /> Não</label>
                <label><input type="radio" name="11_acordo" value="Talvez" /> Talvez</label>
              </div>
            </div>

            <div className={styles.field}>
              <label>12. Há alguém alérgico ou que não gosta de animais? Explique *</label>
              <textarea name="12_alergia" required rows={2}></textarea>
            </div>
          </fieldset>

          {/* SESSÃO 3: PERFIL DO ANIMAL */}
          <fieldset className={styles.section}>
            <legend>3. Sobre a Adoção</legend>

            <div className={styles.field}>
              <label>13. Por qual motivo decidiram ter um animalzinho? *</label>
              <textarea name="13_motivo" required rows={2}></textarea>
            </div>

            <div className={styles.field}>
              <label>14. Animal específico? Se sim, qual nome? *</label>
              <input type="text" name="14_animal_especifico" defaultValue={petName} required />
            </div>

            <div className={styles.subSection}>
              <h4>15. Preferências (Caso não tenha um específico)</h4>
              
              <div className={styles.field}>
                <label>a) Porte *</label>
                <select name="15a_porte">
                  <option value="Nao Importa">Não importa</option>
                  <option value="Mini">Mini (até 4kgs)</option>
                  <option value="Pequeno">Pequeno (5 a 10kgs)</option>
                  <option value="Pequeno Médio">Pequeno para médio (11 a 14kgs)</option>
                  <option value="Medio">Médio (15 a 20kgs)</option>
                  <option value="Grande">Grande (mais de 21 kgs)</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>b) Sexo *</label>
                <div className={styles.radioGroup}>
                  <label><input type="radio" name="15b_sexo" value="Fêmea" /> Só fêmea</label>
                  <label><input type="radio" name="15b_sexo" value="Macho" /> Só macho</label>
                  <label><input type="radio" name="15b_sexo" value="Não importa" defaultChecked /> Não importa</label>
                </div>
              </div>

              <div className={styles.field}>
                <label>c) Idade *</label>
                <select name="15c_idade">
                  <option value="Nao importa">Não importa</option>
                  <option value="Filhote">Filhote (4-11 meses)</option>
                  <option value="Adulto Jovem">Adulto (1 a 5 anos)</option>
                  <option value="Adulto Maduro">Adulto (6 a 9 anos)</option>
                  <option value="Idoso">Idoso</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>d) Personalidade *</label>
                <select name="15d_personalidade">
                  <option value="Brincalhao">Brincalhão</option>
                  <option value="Super Ativo">Super Ativo</option>
                  <option value="Independente">Independente</option>
                  <option value="Carente">Carente</option>
                  <option value="Grudinho">Grudinho</option>
                  <option value="Para Correr">Que possa correr comigo</option>
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label>16. Atividade principal do animal? *</label>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="16_atividade" value="Companhia" required /> Companhia</label>
                <label><input type="radio" name="16_atividade" value="Guarda" /> Guarda</label>
              </div>
            </div>
          </fieldset>

          {/* SESSÃO 4: ROTINA E MORADIA */}
          <fieldset className={styles.section}>
            <legend>4. Rotina e Moradia</legend>
            
            <div className={styles.field}>
              <label>17. Quem será o principal responsável do animal? *</label>
              <input type="text" name="17_responsavel" required />
            </div>

            <div className={styles.field}>
              <label>18. Quantas horas por dia o animal ficará sozinho? *</label>
              <input type="text" name="18_horas_sozinho" required />
            </div>

            <div className={styles.field}>
              <label>Pretende passear? Quantas vezes/horários? *</label>
              <input type="text" name="passeios" required />
            </div>

            <div className={styles.field}>
              <label>19. Sobre sua moradia: *</label>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="19_tipo_moradia" value="Propria" required /> Própria</label>
                <label><input type="radio" name="19_tipo_moradia" value="Alugada" /> Alugada</label>
              </div>
            </div>

            <div className={styles.field}>
              <label>19a. Se alugada, proprietário permite animais?</label>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="19a_proprietario" value="Sim" /> Sim</label>
                <label><input type="radio" name="19a_proprietario" value="Não" /> Não</label>
                <label><input type="radio" name="19a_proprietario" value="Nao sei" /> Não sei</label>
                <label><input type="radio" name="19a_proprietario" value="Nao aplica" defaultChecked /> Minha casa é própria</label>
              </div>
            </div>

            <div className={styles.field}>
              <label>20. Detalhes da moradia: *</label>
              <select name="20_detalhes_moradia" required>
                <option value="">Selecione...</option>
                <option value="Casa quintal">Casa com quintal</option>
                <option value="Casa quintal compartilhado">Casa com quintal Compartilhado</option>
                <option value="Casa sem quintal">Casa sem quintal</option>
                <option value="Muros altos">Casa com muros altos</option>
                <option value="Com Telas">Casa com Telas nas janelas</option>
                <option value="Portao Fechado">Telas no portão ou portão totalmente fechado</option>
                <option value="Tudo fechado">Não tenho muros altos/telas mas deixarei tudo fechado</option>
                <option value="Ap telas total">Apartamento com telas em todas as janelas</option>
                <option value="Ap telas parcial">Apartamento com telas exceto basculantes</option>
                <option value="Ap sem telas">Apartamento sem telas e não colocarei</option>
                <option value="Ap colocarei">Apartamento sem telas mas colocarei</option>
                <option value="Ap varanda fechada">Apartamento com varanda fechada</option>
                <option value="Ap varanda aberta">Apartamento com varanda aberta</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>21. Quem mora na casa/ap? *</label>
              <input type="text" name="21_moradores" placeholder="Cônjuges, Filhos, Avós..." required />
            </div>

            <div className={styles.field}>
              <label>22. Em quais áreas o animal poderá frequentar? *</label>
              <input type="text" name="22_areas_frequentar" required />
            </div>

            <div className={styles.field}>
              <label>23. Em quais períodos poderá frequentar as áreas acima? *</label>
              <input type="text" name="23_periodos" required />
            </div>

            <div className={styles.field}>
              <label>24. Onde o animal irá dormir? *</label>
              <input type="text" name="24_dormir" required />
            </div>

            <div className={styles.field}>
              <label>25. Acesso a cômodos: *</label>
              <select name="25_acesso" required>
                <option value="Total">Acesso total</option>
                <option value="Parcial">Acesso total exceto alguns cômodos</option>
                <option value="Restrito">Somente varanda/quintal</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </fieldset>

          {/* SESSÃO 5: HISTÓRICO DE ANIMAIS */}
          <fieldset className={styles.section}>
            <legend>5. Histórico e Veterinário</legend>

            <div className={styles.field}>
              <label>26. Tem outros animais? Quantos/Quais? *</label>
              <input type="text" name="26_outros_animais" required />
            </div>

            <div className={styles.field}>
              <label>27. Se tem, estão castrados? *</label>
              <input type="text" name="27_castrados" required />
            </div>

            <div className={styles.field}>
              <label>28. Já teve outros animais? Quantos/Quais? *</label>
              <input type="text" name="28_ja_teve" required />
            </div>

            <div className={styles.field}>
              <label>29. O que aconteceu com os antigos? (Se morreram, causa da morte) *</label>
              <textarea name="29_destino_antigos" required rows={2} placeholder="Responda mesmo que tenha convivido na casa dos pais"></textarea>
            </div>

            <div className={styles.field}>
              <label>30. Qual veterinário/clínica pretende usar? *</label>
              <input type="text" name="30_veterinario" required />
            </div>

            <div className={styles.field}>
              <label>31. Qual marca de ração pretende usar? *</label>
              <input type="text" name="31_racao" required />
            </div>
          </fieldset>

          {/* SESSÃO 6: COMPROMISSO */}
          <fieldset className={styles.section}>
            <legend>6. Responsabilidades e Custos</legend>

            <div className={styles.field}>
              <label>32. Concorda com uso de coleira de identificação (Placa)? *</label>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="32_coleira" value="Sim" required /> Sim</label>
                <label><input type="radio" name="32_coleira" value="Não" /> Não</label>
                <label><input type="radio" name="32_coleira" value="Talvez" /> Talvez</label>
              </div>
            </div>

            <div className={styles.field}>
              <label>33. Ciente que o animal passa por adaptação? *</label>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="33_ciencia_adaptacao" value="Sim" required /> Sim</label>
                <label><input type="radio" name="33_ciencia_adaptacao" value="Não" /> Não</label>
                <label><input type="radio" name="33_ciencia_adaptacao" value="Talvez" /> Talvez</label>
              </div>
            </div>

            <div className={styles.field}>
              <label>34. Quanto tempo espera para adaptação? *</label>
              <input type="text" name="34_tempo_adaptacao" required />
            </div>

            <div className={styles.field}>
              <label>35. Disposto a contratar adestrador se precisar? *</label>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="35_adestrador" value="Sim" required /> Sim</label>
                <label><input type="radio" name="35_adestrador" value="Não" /> Não</label>
              </div>
            </div>

            <div className={styles.field}>
              <label>36. Se não contratar, qual motivo? *</label>
              <select name="36_motivo_nao_adestrar">
                <option value="Nao se aplica">Não se aplica (contratarei)</option>
                <option value="Eu ensinarei">Eu mesmo ensinarei</option>
                <option value="Muito caro">É muito caro</option>
                <option value="Nao acredito">Não acredito em adestramento</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label>37. Possui carro? *</label>
                    <div className={styles.radioGroup}>
                        <label><input type="radio" name="37_carro" value="Sim" required /> Sim</label>
                        <label><input type="radio" name="37_carro" value="Não" /> Não</label>
                    </div>
                </div>
            </div>

            <div className={styles.field}>
              <label>38. Em emergência, pode levar ao veterinário? *</label>
              <select name="38_financeiro_vet" required>
                <option value="">Selecione...</option>
                <option value="Sim">Sim, com certeza</option>
                <option value="Nao">Não, no momento não posso ter gastos extras</option>
                <option value="Plano">Sim, porque contratarei plano de saúde</option>
                <option value="Publico">Sim, levarei em hospital público</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>39. Concorda em vacinar/vermifugar periodicamente? *</label>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="39_vacinas" value="Sim" required /> Sim</label>
                <label><input type="radio" name="39_vacinas" value="Não" /> Não</label>
                <label><input type="radio" name="39_vacinas" value="Talvez" /> Talvez</label>
              </div>
            </div>

            <div className={styles.field}>
              <label>40. Previsão de gasto mensal: *</label>
              <select name="40_gasto_mensal" required>
                <option value="100-150">entre 100,00 e 150,00</option>
                <option value="150-250">entre 150,00 e 250,00</option>
                <option value="250-300">entre 250 e 300,00</option>
                <option value="acima 300">acima de 300,00</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </fieldset>

          {/* SESSÃO 7: TERMOS FINAIS */}
          <fieldset className={styles.section}>
            <legend>7. Termos Finais</legend>

            <div className={styles.field}>
              <label>41. Onde viu a divulgação? (Qual perfil?) *</label>
              <input type="text" name="41_divulgacao" required />
            </div>

            <div className={styles.field}>
              <label>42. Aceita mandar notícias (fotos/vídeos)? *</label>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="42_noticias" value="Sim" required /> Sim</label>
                <label><input type="radio" name="42_noticias" value="Não" /> Não</label>
                <label><input type="radio" name="42_noticias" value="Talvez" /> Talvez</label>
              </div>
            </div>

            <div className={styles.field}>
              <label>Aceita visitas do protetor? *</label>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="visitas" value="Sim" required /> Sim</label>
                <label><input type="radio" name="visitas" value="Não" /> Não</label>
              </div>
            </div>

            <div className={styles.field}>
              <label>43. Permite divulgarmos fotos da adoção? *</label>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="43_fotos_adocao" value="Sim" required /> Sim</label>
                <label><input type="radio" name="43_fotos_adocao" value="Não" /> Não</label>
              </div>
            </div>

            <div className={styles.field}>
              <label>44. Concorda com a contribuição de R$ 300,00? *</label>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="44_contribuicao" value="Sim" required /> Sim</label>
                <label><input type="radio" name="44_contribuicao" value="Não" /> Não</label>
              </div>
            </div>

            <div className={styles.field}>
              <label>45. Ciente que vivem 15+ anos? Preparado? *</label>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="45_compromisso_vida" value="Sim" required /> Sim</label>
                <label><input type="radio" name="45_compromisso_vida" value="Não" /> Não</label>
                <label><input type="radio" name="45_compromisso_vida" value="Talvez" /> Talvez</label>
              </div>
            </div>
          </fieldset>

          {/* SESSÃO 8: SITUAÇÕES HIPOTÉTICAS */}
          <fieldset className={styles.section}>
            <legend>8. O que acontecerá se...</legend>
            <p className={styles.helperText}>Responda com detalhes. Questões para reflexão.</p>

            <div className={styles.field}>
              <label>46a. Alguém engravidar? *</label>
              <textarea name="46a_gravidez" required rows={2}></textarea>
            </div>
            <div className={styles.field}>
              <label>46b. A família viajar? *</label>
              <textarea name="46b_viagem" required rows={2}></textarea>
            </div>
            <div className={styles.field}>
              <label>46c. Mudança para casa menor? *</label>
              <textarea name="46c_mudanca_menor" required rows={2}></textarea>
            </div>
            <div className={styles.field}>
              <label>46d. Mudança de cidade/país? *</label>
              <textarea name="46d_mudanca_longe" required rows={2}></textarea>
            </div>
            <div className={styles.field}>
              <label>46e. Separação do casal? *</label>
              <textarea name="46e_separacao" required rows={2}></textarea>
            </div>
            <div className={styles.field}>
              <label>46f. Falecimento do responsável? *</label>
              <textarea name="46f_falecimento" required rows={2}></textarea>
            </div>
          </fieldset>

          {/* SESSÃO 9: O QUE FARIA SE... */}
          <fieldset className={styles.section}>
             <legend>9. O que faria se o animal...</legend>
             <div className={styles.field}>
              <label>47a. Se perdesse? *</label>
              <input type="text" name="47a_perder" required />
            </div>
            <div className={styles.field}>
              <label>47b. Adoecesse/Acidente? *</label>
              <input type="text" name="47b_doenca" required />
            </div>
            <div className={styles.field}>
              <label>47c. Mordesse alguém? *</label>
              <input type="text" name="47c_morder" required />
            </div>
            <div className={styles.field}>
              <label>47d. Destruísse objetos de valor? *</label>
              <input type="text" name="47d_destruicao" required />
            </div>
            <div className={styles.field}>
              <label>47e. Fizesse necessidades no lugar errado? *</label>
              <input type="text" name="47e_xixi_errado" required />
            </div>
          </fieldset>

          {/* FINALIZAÇÃO */}
          <fieldset className={styles.section}>
            <legend>Finalização</legend>
            <div className={styles.field}>
              <label>48. O que vai comprar para recebê-lo? *</label>
              <textarea name="48_enxoval" required rows={2}></textarea>
            </div>
            <div className={styles.field}>
              <label>49. Em que condição devolveria o animal? *</label>
              <textarea name="49_devolucao" required rows={2}></textarea>
            </div>

            <div className={styles.warningBox}>
                <strong>IMPORTANTE!</strong> Você não poderá doar a outra pessoa o animal adotado sem antes comunicar sua intenção ao protetor.
            </div>

            <div className={styles.field}>
                <label>Concorda com o termo acima? *</label>
                <div className={styles.radioGroup}>
                    <label><input type="radio" name="termo_nao_repassar" value="Sim" required /> Sim</label>
                    <label><input type="radio" name="termo_nao_repassar" value="Não" /> Não</label>
                </div>
            </div>

            <div className={styles.field}>
              <label>50. Espaço para observações</label>
              <textarea name="50_obs" rows={3}></textarea>
            </div>

          </fieldset>

          <div className={styles.formFooter}>
            <Button 
              type="submit" 
              size="lg" 
              disabled={state.submitting}
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