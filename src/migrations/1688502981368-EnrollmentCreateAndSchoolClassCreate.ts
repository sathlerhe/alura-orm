import { MigrationInterface, QueryRunner } from 'typeorm'

export class EnrollmentCreateAndSchoolClassCreate1688502981368
  implements MigrationInterface
{
  name = 'EnrollmentCreateAndSchoolClassCreate1688502981368'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`school_class\` (\`id\` int NOT NULL AUTO_INCREMENT, \`initial_date\` datetime NOT NULL, \`professorId\` int NULL, \`levelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`enrollment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL, \`studentId\` int NULL, \`schoolClassId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `ALTER TABLE \`school_class\` ADD CONSTRAINT \`FK_b78ff537db58e82b08acfe4513e\` FOREIGN KEY (\`professorId\`) REFERENCES \`people\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`school_class\` ADD CONSTRAINT \`FK_9db9a44a9af4ebc5e7afdd30b6b\` FOREIGN KEY (\`levelId\`) REFERENCES \`level\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`enrollment\` ADD CONSTRAINT \`FK_5ce702e71b98cc1bb37b81e83d8\` FOREIGN KEY (\`studentId\`) REFERENCES \`people\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`enrollment\` ADD CONSTRAINT \`FK_bb1271c4bd69cdc3acadf1a9bc9\` FOREIGN KEY (\`schoolClassId\`) REFERENCES \`school_class\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`enrollment\` DROP FOREIGN KEY \`FK_bb1271c4bd69cdc3acadf1a9bc9\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`enrollment\` DROP FOREIGN KEY \`FK_5ce702e71b98cc1bb37b81e83d8\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`school_class\` DROP FOREIGN KEY \`FK_9db9a44a9af4ebc5e7afdd30b6b\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`school_class\` DROP FOREIGN KEY \`FK_b78ff537db58e82b08acfe4513e\``,
    )
    await queryRunner.query(`DROP TABLE \`enrollment\``)
    await queryRunner.query(`DROP TABLE \`school_class\``)
  }
}
