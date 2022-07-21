-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dbmoney
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dbmoney
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dbmoney` ;
USE `dbmoney` ;

-- -----------------------------------------------------
-- Table `dbmoney`.`Gerente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Gerente` (
  `gerente_id` INT NOT NULL AUTO_INCREMENT,
  `gerente_nome` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`gerente_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Cliente` (
  `cliente_id` INT NOT NULL AUTO_INCREMENT,
  `cliente_nome` VARCHAR(60) NOT NULL,
  `cliente_email` VARCHAR(60) NULL,
  `cliente_telefone` VARCHAR(15) NOT NULL,
  `cliente_cpf` VARCHAR(11) NOT NULL,
  `cliente_endereco` VARCHAR(90) NOT NULL,
  `cliente_data_nascimento` DATE NOT NULL,
  `cliente_senha` VARCHAR(255) NOT NULL,
  `cliente_id_gerente` INT NOT NULL,
  PRIMARY KEY (`cliente_id`),
  UNIQUE INDEX `cpf_UNIQUE` (`cliente_cpf` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`cliente_id` ASC) VISIBLE,
  INDEX `id_gerente_idx` (`cliente_id_gerente` ASC) VISIBLE,
  CONSTRAINT `fk_id_gerente`
    FOREIGN KEY (`cliente_id_gerente`)
    REFERENCES `dbmoney`.`Gerente` (`gerente_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`Extrato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Extrato` (
  `extrato_id` INT NOT NULL AUTO_INCREMENT,
  `extrato_data_fim` DATETIME NOT NULL,
  `extrato_data_inicio` DATETIME NOT NULL,
  `extrato_id_cliente` INT NOT NULL,
  PRIMARY KEY (`extrato_id`, `extrato_id_cliente`),
  INDEX `fk_id_cliente_idx` (`extrato_id_cliente` ASC) VISIBLE,
  CONSTRAINT `fk_id_cliente`
    FOREIGN KEY (`extrato_id_cliente`)
    REFERENCES `dbmoney`.`Cliente` (`cliente_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`Operacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Operacao` (
  `operacao_id` INT NOT NULL AUTO_INCREMENT,
  `operacao_codigo` BIGINT NOT NULL,
  `operacao_data` DATETIME NOT NULL,
  `operacao_valor` DOUBLE NOT NULL,
  PRIMARY KEY (`operacao_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`Conta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Conta` (
  `conta_codigo` INT NOT NULL AUTO_INCREMENT,
  `conta_tipo` INT NOT NULL,
  `conta_saldo` DOUBLE NOT NULL,
  `conta_codigo_agencia` INT NOT NULL,
  PRIMARY KEY (`conta_codigo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`ContaTitular`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`ContaTitular` (
  `contatitular_codigo` INT NOT NULL,
  PRIMARY KEY (`contatitular_codigo`),
  CONSTRAINT `fk_ContaTitular_Conta1`
    FOREIGN KEY (`contatitular_codigo`)
    REFERENCES `dbmoney`.`Conta` (`conta_codigo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`Titular`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Titular` (
  `titular_id` INT NOT NULL,
  `titular_cod_conta` INT NOT NULL,
  PRIMARY KEY (`titular_id`),
  INDEX `fk_cod_conta_idx` (`titular_cod_conta` ASC) VISIBLE,
  CONSTRAINT `fk_Titular_Cliente1`
    FOREIGN KEY (`titular_id`)
    REFERENCES `dbmoney`.`Cliente` (`cliente_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cod_conta`
    FOREIGN KEY (`titular_cod_conta`)
    REFERENCES `dbmoney`.`ContaTitular` (`contatitular_codigo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`Cartao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Cartao` (
  `cartao_num_cartao` BIGINT(16) NOT NULL,
  `cartao_cvc` INT NOT NULL,
  `cartao_validade` DATE NOT NULL,
  `cartao_status` VARCHAR(45) NOT NULL,
  `cartao_id_titular` INT NOT NULL,
  PRIMARY KEY (`cartao_num_cartao`),
  INDEX `fk_id_titular_idx` (`cartao_id_titular` ASC) VISIBLE,
  CONSTRAINT `fk_id_titular`
    FOREIGN KEY (`cartao_id_titular`)
    REFERENCES `dbmoney`.`Titular` (`titular_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`Emprestimo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Emprestimo` (
  `emprestimo_id` INT NOT NULL AUTO_INCREMENT,
  `emprestimo_taxa_juros` DECIMAL NOT NULL,
  `emprestimo_prazo` DATE NOT NULL,
  `emprestimo_valor_inicial` DOUBLE NOT NULL,
  `emprestimo_valor_final` DOUBLE NOT NULL,
  `emprestimo_id_titular` INT NOT NULL,
  PRIMARY KEY (`emprestimo_id`),
  INDEX `fk_id_titular_idx` (`emprestimo_id_titular` ASC) VISIBLE,
  CONSTRAINT `fk_emprestimo_id_titular`
    FOREIGN KEY (`emprestimo_id_titular`)
    REFERENCES `dbmoney`.`Titular` (`titular_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`ChavePix`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`ChavePix` (
  `chavepix_valor` VARCHAR(60) NOT NULL,
  `chavepix_tipo` INT NOT NULL,
  `chavepix_conta_codigo` INT NOT NULL,
  PRIMARY KEY (`chavepix_valor`),
  INDEX `conta_codigo_idx` (`chavepix_conta_codigo` ASC) VISIBLE,
  CONSTRAINT `conta_codigo`
    FOREIGN KEY (`chavepix_conta_codigo`)
    REFERENCES `dbmoney`.`Conta` (`conta_codigo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`CartaoDebito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`CartaoDebito` (
  `cartaodebito_num_cartao` BIGINT(16) NOT NULL,
  PRIMARY KEY (`cartaodebito_num_cartao`),
  CONSTRAINT `fk_CartaoDependente_Cartao1`
    FOREIGN KEY (`cartaodebito_num_cartao`)
    REFERENCES `dbmoney`.`Cartao` (`cartao_num_cartao`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`ContaDependente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`ContaDependente` (
  `contadependente_codigo` INT NOT NULL,
  PRIMARY KEY (`contadependente_codigo`),
  CONSTRAINT `fk_ContaDependente_Conta1`
    FOREIGN KEY (`contadependente_codigo`)
    REFERENCES `dbmoney`.`Conta` (`conta_codigo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`Dependente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Dependente` (
  `dependente_id` INT NOT NULL,
  `dependente_titular_id` INT NOT NULL,
  `dependente_num_cartao` BIGINT(16) NOT NULL,
  `dependente_cod_conta` INT NOT NULL,
  PRIMARY KEY (`dependente_id`),
  INDEX `fk_Dependente_Titular1_idx` (`dependente_titular_id` ASC) VISIBLE,
  INDEX `num_cartao_idx` (`dependente_num_cartao` ASC) VISIBLE,
  INDEX `fk_conta_codigo_idx` (`dependente_cod_conta` ASC) VISIBLE,
  CONSTRAINT `fk_Dependente_Cliente`
    FOREIGN KEY (`dependente_id`)
    REFERENCES `dbmoney`.`Cliente` (`cliente_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Dependente_Titular1`
    FOREIGN KEY (`dependente_titular_id`)
    REFERENCES `dbmoney`.`Titular` (`titular_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `num_cartao`
    FOREIGN KEY (`dependente_num_cartao`)
    REFERENCES `dbmoney`.`CartaoDebito` (`cartaodebito_num_cartao`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_conta_codigo`
    FOREIGN KEY (`dependente_cod_conta`)
    REFERENCES `dbmoney`.`ContaDependente` (`contadependente_codigo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`Saque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Saque` (
  `saque_operacao_id` INT NOT NULL,
  `saque_id_terminal` INT NOT NULL,
  PRIMARY KEY (`saque_operacao_id`),
  CONSTRAINT `fk_Saque_Operacao1`
    FOREIGN KEY (`saque_operacao_id`)
    REFERENCES `dbmoney`.`Operacao` (`operacao_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`CartaoCredito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`CartaoCredito` (
  `cartaocredito_num_cartao` BIGINT(16) NOT NULL,
  `cartaocredito_limite` DOUBLE NOT NULL,
  PRIMARY KEY (`cartaocredito_num_cartao`),
  CONSTRAINT `fk_CartaoTitular_Cartao1`
    FOREIGN KEY (`cartaocredito_num_cartao`)
    REFERENCES `dbmoney`.`Cartao` (`cartao_num_cartao`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`Transacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Transacao` (
  `transacao_operacao_id` INT NOT NULL,
  `transacao_conta` VARCHAR(45) NOT NULL,
  `transacao_banco` VARCHAR(45) NOT NULL,
  `transacao_agencia` VARCHAR(45) NOT NULL,
  `transacao_tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`transacao_operacao_id`),
  CONSTRAINT `fk_Transacao_Operacao1`
    FOREIGN KEY (`transacao_operacao_id`)
    REFERENCES `dbmoney`.`Operacao` (`operacao_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`Transferencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Transferencia` (
  `transferencia_id_transacao` INT NOT NULL,
  PRIMARY KEY (`transferencia_id_transacao`),
  CONSTRAINT `fk_id_transacao`
    FOREIGN KEY (`transferencia_id_transacao`)
    REFERENCES `dbmoney`.`Transacao` (`transacao_operacao_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`Recarga`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Recarga` (
  `recarga_operacao_id` INT NOT NULL,
  `recarga_operadora` VARCHAR(45) NOT NULL,
  `recarga_num_telefone` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`recarga_operacao_id`),
  CONSTRAINT `fk_Recarga_Operacao1`
    FOREIGN KEY (`recarga_operacao_id`)
    REFERENCES `dbmoney`.`Operacao` (`operacao_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`Pix`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Pix` (
  `pix_id_transacao` INT NOT NULL,
  PRIMARY KEY (`pix_id_transacao`),
  CONSTRAINT `fk_pix_id_transacao`
    FOREIGN KEY (`pix_id_transacao`)
    REFERENCES `dbmoney`.`Transacao` (`transacao_operacao_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`Compoe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Compoe` (
  `compoe_id_operacao` INT NOT NULL,
  `compoe_id_extrato` INT NOT NULL,
  PRIMARY KEY (`compoe_id_operacao`, `compoe_id_extrato`),
  INDEX `fk_id_extrato_idx` (`compoe_id_extrato` ASC) VISIBLE,
  CONSTRAINT `fk_id_operacao`
    FOREIGN KEY (`compoe_id_operacao`)
    REFERENCES `dbmoney`.`Operacao` (`operacao_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_id_extrato`
    FOREIGN KEY (`compoe_id_extrato`)
    REFERENCES `dbmoney`.`Extrato` (`extrato_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbmoney`.`Realiza`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbmoney`.`Realiza` (
  `realiza_id_operacao` INT NOT NULL,
  `realiza_id_cliente` INT NOT NULL,
  `realiza_cashback` DOUBLE NOT NULL,
  PRIMARY KEY (`realiza_id_operacao`, `realiza_id_cliente`),
  INDEX `fk_id_cliente_idx` (`realiza_id_cliente` ASC) VISIBLE,
  CONSTRAINT `fk_realiza_id_operacao`
    FOREIGN KEY (`realiza_id_operacao`)
    REFERENCES `dbmoney`.`Operacao` (`operacao_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_realiza_id_cliente`
    FOREIGN KEY (`realiza_id_cliente`)
    REFERENCES `dbmoney`.`Cliente` (`cliente_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
