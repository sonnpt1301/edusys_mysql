import {MigrationInterface, QueryRunner} from "typeorm";

export class migration2507011658736797056 implements MigrationInterface {
    name = 'migration2507011658736797056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`courses\` ADD \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD CONSTRAINT \`FK_c730473dfb837b3e62057cd9447\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`courses\` DROP FOREIGN KEY \`FK_c730473dfb837b3e62057cd9447\``);
        await queryRunner.query(`ALTER TABLE \`courses\` DROP COLUMN \`categoryId\``);
    }

}
