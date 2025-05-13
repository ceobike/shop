import fs from 'fs';
import path from 'path';
import { logger } from '../../utils/logger';

// Get migration name from command line arguments
const migrationName = process.argv[2];

if (!migrationName) {
  logger.error('Migration name is required');
  process.exit(1);
}

// Create migration file
const createMigration = () => {
  try {
    // Create migrations directory if it doesn't exist
    const migrationsDir = path.join(__dirname, '../migrations');
    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir, { recursive: true });
    }

    // Generate timestamp
    const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, '');
    const fileName = `${timestamp}-${migrationName}.ts`;
    const filePath = path.join(migrationsDir, fileName);

    // Migration template
    const migrationTemplate = `import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  // Add your migration code here
  // Example:
  // await queryInterface.createTable('users', {
  //   id: {
  //     type: DataTypes.UUID,
  //     defaultValue: DataTypes.UUIDV4,
  //     primaryKey: true,
  //   },
  //   username: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //     unique: true,
  //   },
  //   createdAt: {
  //     type: DataTypes.DATE,
  //     allowNull: false,
  //     defaultValue: DataTypes.NOW,
  //   },
  //   updatedAt: {
  //     type: DataTypes.DATE,
  //     allowNull: false,
  //     defaultValue: DataTypes.NOW,
  //   },
  // });
};

export const down = async (queryInterface: QueryInterface) => {
  // Add your rollback code here
  // Example:
  // await queryInterface.dropTable('users');
};
`;

    // Write migration file
    fs.writeFileSync(filePath, migrationTemplate);
    logger.info(`Migration file created: ${fileName}`);
  } catch (error) {
    logger.error('Error creating migration file:', error);
    process.exit(1);
  }
};

// Run migration creation
createMigration();
