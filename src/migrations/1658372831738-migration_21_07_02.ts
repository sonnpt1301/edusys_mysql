import {MigrationInterface, QueryRunner} from "typeorm";

export class migration2107021658372831738 implements MigrationInterface {
    name = 'migration2107021658372831738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`city\` varchar(255) NULL, \`address\` varchar(255) NULL, \`phone\` int NULL, \`avatarUrl\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`accountId\` int NULL, UNIQUE INDEX \`REL_4b8eef0e147abd2c7fa009a91d\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tutors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`city\` varchar(255) NULL, \`address\` varchar(255) NULL, \`phone\` int NULL, \`avatarUrl\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`accountId\` int NULL, UNIQUE INDEX \`REL_cb74ecb00158944e3002cc0534\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`admin\` ADD CONSTRAINT \`FK_4b8eef0e147abd2c7fa009a91dd\` FOREIGN KEY (\`accountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tutors\` ADD CONSTRAINT \`FK_cb74ecb00158944e3002cc0534a\` FOREIGN KEY (\`accountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tutors\` DROP FOREIGN KEY \`FK_cb74ecb00158944e3002cc0534a\``);
        await queryRunner.query(`ALTER TABLE \`admin\` DROP FOREIGN KEY \`FK_4b8eef0e147abd2c7fa009a91dd\``);
        await queryRunner.query(`DROP INDEX \`REL_cb74ecb00158944e3002cc0534\` ON \`tutors\``);
        await queryRunner.query(`DROP TABLE \`tutors\``);
        await queryRunner.query(`DROP INDEX \`REL_4b8eef0e147abd2c7fa009a91d\` ON \`admin\``);
        await queryRunner.query(`DROP TABLE \`admin\``);
    }

}
