import {MigrationInterface, QueryRunner} from "typeorm";

export class migration2507021658745758078 implements MigrationInterface {
    name = 'migration2507021658745758078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users_courses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`courseId\` int NULL, \`studentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_courses\` ADD CONSTRAINT \`FK_c3f1216cf54967a0517ef60c02e\` FOREIGN KEY (\`courseId\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_courses\` ADD CONSTRAINT \`FK_6b9ca4a2c1023ae80dddb712679\` FOREIGN KEY (\`studentId\`) REFERENCES \`students\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_courses\` DROP FOREIGN KEY \`FK_6b9ca4a2c1023ae80dddb712679\``);
        await queryRunner.query(`ALTER TABLE \`users_courses\` DROP FOREIGN KEY \`FK_c3f1216cf54967a0517ef60c02e\``);
        await queryRunner.query(`DROP TABLE \`users_courses\``);
    }

}
