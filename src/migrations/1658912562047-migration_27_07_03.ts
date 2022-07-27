import {MigrationInterface, QueryRunner} from "typeorm";

export class migration2707031658912562047 implements MigrationInterface {
    name = 'migration2707031658912562047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b9e1eb8aea30ea2192cd8f0a31\` ON \`blogs\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_b9e1eb8aea30ea2192cd8f0a31\` ON \`blogs\` (\`title\`)`);
    }

}
