import {MigrationInterface, QueryRunner} from "typeorm";

export class migration2707011658911955151 implements MigrationInterface {
    name = 'migration2707011658911955151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`blogs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NULL, \`image\` varchar(255) NULL, \`status\` int NOT NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdById\` int NULL, UNIQUE INDEX \`IDX_b9e1eb8aea30ea2192cd8f0a31\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`blogs\` ADD CONSTRAINT \`FK_912dfd2dfbe7cd3480c18a6e053\` FOREIGN KEY (\`createdById\`) REFERENCES \`students\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blogs\` DROP FOREIGN KEY \`FK_912dfd2dfbe7cd3480c18a6e053\``);
        await queryRunner.query(`DROP INDEX \`IDX_b9e1eb8aea30ea2192cd8f0a31\` ON \`blogs\``);
        await queryRunner.query(`DROP TABLE \`blogs\``);
    }

}
