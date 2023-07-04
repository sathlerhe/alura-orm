import { MigrationInterface, QueryRunner } from 'typeorm'

export class LevelCreate1688500368066 implements MigrationInterface {
  name = 'LevelCreate1688500368066'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`level\` (\`id\` int NOT NULL AUTO_INCREMENT, \`level_description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`level\``)
  }
}
