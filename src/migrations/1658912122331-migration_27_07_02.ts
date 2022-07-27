import {MigrationInterface, QueryRunner} from "typeorm";

export class migration2707021658912122331 implements MigrationInterface {
    name = 'migration2707021658912122331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blogs\` DROP FOREIGN KEY \`FK_912dfd2dfbe7cd3480c18a6e053\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` DROP COLUMN \`createdById\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` ADD \`createdBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` ADD \`courseId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` ADD CONSTRAINT \`FK_2633b9726440bec9222fbfe4fb7\` FOREIGN KEY (\`createdBy\`) REFERENCES \`students\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`blogs\` ADD CONSTRAINT \`FK_17123928cc5af68eff9a5b57079\` FOREIGN KEY (\`courseId\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blogs\` DROP FOREIGN KEY \`FK_17123928cc5af68eff9a5b57079\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` DROP FOREIGN KEY \`FK_2633b9726440bec9222fbfe4fb7\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` DROP COLUMN \`courseId\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` DROP COLUMN \`createdBy\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` ADD \`createdById\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` ADD CONSTRAINT \`FK_912dfd2dfbe7cd3480c18a6e053\` FOREIGN KEY (\`createdById\`) REFERENCES \`students\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
