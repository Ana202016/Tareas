//para crear tarea
export class CreateTaskDto {
    description: String;
    date: Date;
}

export class UpdateTaskDto {
    description?: String;
    date?: Date;
}