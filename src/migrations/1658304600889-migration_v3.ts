import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationV31658304600889 implements MigrationInterface {
    name = 'migrationV31658304600889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('0', '1', '2') NOT NULL DEFAULT '2', \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`account\``);
    }

}
