import { appSchema, tableSchema } from '@nozbe/watermelondb'
import { taskSchema } from './TaskSchema'

export const schema = appSchema({
  version: 1,
  tables: [
    taskSchema
  ]
})