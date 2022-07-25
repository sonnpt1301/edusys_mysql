import {MigrationInterface, QueryRunner} from "typeorm";

export class migration25071658724332845 implements MigrationInterface {
    name = 'migration25071658724332845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`courses\` DROP FOREIGN KEY \`FK_ff482a765c101d651ea06288745\``);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD CONSTRAINT \`FK_ff482a765c101d651ea06288745\` FOREIGN KEY (\`createdBy\`) REFERENCES \`tutors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`courses\` DROP FOREIGN KEY \`FK_ff482a765c101d651ea06288745\``);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD CONSTRAINT \`FK_ff482a765c101d651ea06288745\` FOREIGN KEY (\`createdBy\`) REFERENCES \`admin\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
