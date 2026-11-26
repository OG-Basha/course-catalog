
declare const process: {
    argv: string[];
};

interface Course {
    id: string;
    title: string;
    category: "web" | "programming" | "design";
    month: number;
}

const catalog: Array<Course> = [
    {id: "web101", title: "Web Development Basics", category: "web", month: 2},
    {id: "prog101", title: "Programming Fundamentals", category: "programming", month: 3},
    {id: "des101", title: "Interface Design", category: "design", month: 3},
    {id: "web201", title: "Accessible Web Forms", category: "web", month: 4},
    {id: "prog201", title: "TypeScript Basics", category: "programming", month: 5},
]

function listCourses(): void{
    for (const course of catalog){
        console.log(course.id + " | " + course.title + " | " + course.category + " | Month " + course.month);
    }
}

function filterCourses(text: string): void {
    for (const course of catalog) {
        if (
            course.title.toLowerCase().includes(text.toLowerCase()) ||
            course.category.toLowerCase().includes(text.toLowerCase())
        ) {
            console.log(course.id + " | " + course.title + " | " + course.category + " | Month " + course.month);
        }
    }
}

function findCourse(id: string): Course | undefined {
    for (const course of catalog) {
        if (course.id === id) {
            return course;
        }
    }
    return undefined;
}

function showDetails(id: string): void {
    const course = findCourse(id);
    if (course === undefined) {
        console.log("No course found with ID " + id);
    } else {
        console.log(course.id + " | " + course.title + " | " + course.category + " | Month " + course.month);
    }
}

function coursesBetween(startMonth: number, endMonth: number): void {
    for (const course of catalog) {
        if (course.month >= startMonth && course.month <= endMonth) {
            console.log(course.id + " | " + course.title + " | " + course.category + " | Month " + course.month);
        }
    }
}

const [command, arg1, arg2] = process.argv.slice(2);

if (command === "list") {
    listCourses();
} else if (command === "filter") {
    if (arg1 === undefined) {
        console.error("Usage: node catalog.ts filter <text>");
    } else {
        filterCourses(arg1);
    }
} else if (command === "details") {
    if (arg1 === undefined) {
        console.error("Usage: node catalog.ts details <id>");
    } else {
        showDetails(arg1);
    }
} else if (command === "between") {
    const startMonth = Number(arg1);
    const endMonth = Number(arg2);
    if (
        arg1 === undefined ||
        arg2 === undefined ||
        isNaN(startMonth) ||
        isNaN(endMonth) ||
        Math.floor(startMonth) !== startMonth ||
        Math.floor(endMonth) !== endMonth ||
        startMonth < 1 ||
        startMonth > 12 ||
        endMonth < startMonth ||
        endMonth > 12
    ) {
        console.error("Usage: node catalog.ts between <startMonth 1-12> <endMonth 1-12>");
    } else {
        coursesBetween(startMonth, endMonth);
    }
} else {
    console.error("Usage: node catalog.ts <list|filter <text>|details <id>|between <startMonth> <endMonth>>");
}
