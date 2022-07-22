import {MigrationInterface, QueryRunner} from "typeorm";

export class migration22071658482520159 implements MigrationInterface {
    name = 'migration22071658482520159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_a6ada6f4dcf60db496fe71d7a96\``);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`createdById\` \`createdBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_fb69fc5cdf3d7351b17eb5e9068\` FOREIGN KEY (\`createdBy\`) REFERENCES \`admin\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_fb69fc5cdf3d7351b17eb5e9068\``);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`createdBy\` \`createdById\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_a6ada6f4dcf60db496fe71d7a96\` FOREIGN KEY (\`createdById\`) REFERENCES \`admin\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
