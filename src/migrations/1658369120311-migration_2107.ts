import {MigrationInterface, QueryRunner} from "typeorm";

export class migration21071658369120311 implements MigrationInterface {
    name = 'migration21071658369120311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_25985d58c714a4a427ced57507\` ON \`students\``);
        await queryRunner.query(`DROP INDEX \`IDX_9aade3cfe3e20d001e056d11b8\` ON \`students\``);
        await queryRunner.query(`ALTER TABLE \`students\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`students\` CHANGE \`firstName\` \`firstName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`students\` CHANGE \`lastName\` \`lastName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`students\` CHANGE \`city\` \`city\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`students\` CHANGE \`address\` \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`students\` CHANGE \`phone\` \`phone\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`students\` CHANGE \`avatarUrl\` \`avatarUrl\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`students\` CHANGE \`avatarUrl\` \`avatarUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`students\` CHANGE \`phone\` \`phone\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`students\` CHANGE \`address\` \`address\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`students\` CHANGE \`city\` \`city\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`students\` CHANGE \`lastName\` \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`students\` CHANGE \`firstName\` \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`students\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_9aade3cfe3e20d001e056d11b8\` ON \`students\` (\`accountId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_25985d58c714a4a427ced57507\` ON \`students\` (\`email\`)`);
    }

}
