import {MigrationInterface, QueryRunner} from "typeorm";

export class migration011658423025003 implements MigrationInterface {
    name = 'migration011658423025003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`students\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`city\` varchar(255) NULL, \`address\` varchar(255) NULL, \`phone\` int NULL, \`avatarUrl\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`accountId\` int NULL, UNIQUE INDEX \`REL_9aade3cfe3e20d001e056d11b8\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tutors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`city\` varchar(255) NULL, \`address\` varchar(255) NULL, \`phone\` int NULL, \`avatarUrl\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`accountId\` int NULL, UNIQUE INDEX \`REL_cb74ecb00158944e3002cc0534\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`passwordResetToken\` varchar(255) NULL, \`role\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ee66de6cdc53993296d1ceb8aa\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`city\` varchar(255) NULL, \`address\` varchar(255) NULL, \`phone\` int NULL, \`avatarUrl\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`accountId\` int NULL, UNIQUE INDEX \`REL_4b8eef0e147abd2c7fa009a91d\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`students\` ADD CONSTRAINT \`FK_9aade3cfe3e20d001e056d11b84\` FOREIGN KEY (\`accountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tutors\` ADD CONSTRAINT \`FK_cb74ecb00158944e3002cc0534a\` FOREIGN KEY (\`accountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`admin\` ADD CONSTRAINT \`FK_4b8eef0e147abd2c7fa009a91dd\` FOREIGN KEY (\`accountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admin\` DROP FOREIGN KEY \`FK_4b8eef0e147abd2c7fa009a91dd\``);
        await queryRunner.query(`ALTER TABLE \`tutors\` DROP FOREIGN KEY \`FK_cb74ecb00158944e3002cc0534a\``);
        await queryRunner.query(`ALTER TABLE \`students\` DROP FOREIGN KEY \`FK_9aade3cfe3e20d001e056d11b84\``);
        await queryRunner.query(`DROP INDEX \`REL_4b8eef0e147abd2c7fa009a91d\` ON \`admin\``);
        await queryRunner.query(`DROP TABLE \`admin\``);
        await queryRunner.query(`DROP INDEX \`IDX_ee66de6cdc53993296d1ceb8aa\` ON \`accounts\``);
        await queryRunner.query(`DROP TABLE \`accounts\``);
        await queryRunner.query(`DROP INDEX \`REL_cb74ecb00158944e3002cc0534\` ON \`tutors\``);
        await queryRunner.query(`DROP TABLE \`tutors\``);
        await queryRunner.query(`DROP INDEX \`REL_9aade3cfe3e20d001e056d11b8\` ON \`students\``);
        await queryRunner.query(`DROP TABLE \`students\``);
    }

}
