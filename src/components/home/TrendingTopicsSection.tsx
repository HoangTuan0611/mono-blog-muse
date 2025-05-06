import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  writeBatch,
  doc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define the TrendingTopic interface
interface TrendingTopic {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  author: string;
  avatar?: string;
  active?: boolean;
  content?: string; // Rich HTML content from Notion or other sources
  updatedAt?: Date | string; // Add timestamp for when content was updated
}

// Helper function to format Notion-like content for proper display
const formatNotionContent = (content: string): string => {
  if (!content) return "";

  // Replace Notion-style code blocks with proper HTML code blocks
  let formattedContent = content
    // Format code blocks (```sh, ```tsx, etc.)
    .replace(/```(\w+)\n([\s\S]*?)```/g, (_, language, code) => {
      return `<pre class="language-${language} rounded-md p-4 bg-gray-100 dark:bg-gray-800 overflow-x-auto"><code>${code.trim()}</code></pre>`;
    })
    // Format inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">$1</code>')
    // Format emojis with proper styling
    .replace(/🔹|✅|📌|🎯/g, '<span class="text-xl">$&</span>')
    // Format headings (## Heading)
    .replace(/## (.*?)$/gm, '<h2 class="text-2xl font-bold mt-6 mb-2">$1</h2>')
    // Format subheadings (### Heading)
    .replace(/### (.*?)$/gm, '<h3 class="text-xl font-semibold mt-5 mb-2">$1</h3>')
    // Format horizontal rules
    .replace(/---/g, '<hr class="my-6 border-t border-gray-200 dark:border-gray-700" />')
    // Format bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  return formattedContent;
};

const TrendingTopicsSection = () => {
  const trendingScrollRef = useRef<HTMLDivElement>(null);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<TrendingTopic | null>(null);

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      const topicsCollection = collection(db, "trending-topics");
      try {
        setLoading(true);

        // Fetch trending topics from Firebase 'trending-topics' collection
        const topicsCollection = collection(db, "trending-topics");
        // You could add where("trending", "==", true) if you have a trending flag
        // const q = query(topicsCollection, orderBy("updatedAt", "desc"), limit(8));
        const querySnapshot = await getDocs(topicsCollection);

        if (!querySnapshot.empty) {
          const topicsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as TrendingTopic[];

          setTrendingTopics(topicsData);
        } else {
          // Fallback to hardcoded data if no trending topics found
          const batch = writeBatch(db);

          // Add each certification to the batch
          getDefaultTrendingTopics().forEach((certification) => {
            // Remove the id from the data as Firestore will generate its own
            const { id, ...trendingTopicData } = certification;
            const docRef = doc(topicsCollection);
            batch.set(docRef, trendingTopicData);
          });

          // Commit the batch
          await batch.commit();
          // setTrendingTopics(getDefaultTrendingTopics());
        }
      } catch (error) {
        console.error("Error fetching trending topics:", error);
        // Fallback to hardcoded data if Firebase fetch fails
        // setTrendingTopics(getDefaultTrendingTopics());
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTopics();
  }, []);

  // Handle trending section navigation
  const handlePrevSlide = () => {
    if (trendingScrollRef.current) {
      const scrollContainer = trendingScrollRef.current;
      const cardWidth = 280; // Average width of a card including gap
      scrollContainer.scrollBy({ left: -cardWidth * 2, behavior: "smooth" });
    }
  };

  const handleNextSlide = () => {
    if (trendingScrollRef.current) {
      const scrollContainer = trendingScrollRef.current;
      const cardWidth = 280; // Average width of a card including gap
      scrollContainer.scrollBy({ left: cardWidth * 2, behavior: "smooth" });
    }
  };

  // Helper function to get initials from author name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 visible">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-medium mb-2">Trending this month</h2>
            <p className="text-gray-600 dark:text-gray-300 font-serif">
              Popular topics our readers are exploring right now
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              id="prev-slide"
              className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={handlePrevSlide}
              aria-label="Previous topics"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="next-slide"
              className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={handleNextSlide}
              aria-label="Next topics"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-visible">
          <div
            ref={trendingScrollRef}
            className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          >
            {/* Trending Topics Header Card */}
            <div className="trending-card min-w-[200px] w-[220px] flex-shrink-0 flex items-center justify-center p-8 text-white snap-start">
              <div className="text-center">
                <div className="mb-4 inline-block bg-white/20 p-3 rounded-full">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Trending this month
                </h3>
              </div>
            </div>

            {loading
              ? // Loading skeletons for trending topics
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="topic-card min-w-[280px] w-[280px] flex-shrink-0 p-6 snap-start"
                  >
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4 mb-3" />
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                    <div className="flex items-center mt-4">
                      <Skeleton className="w-8 h-8 rounded-full mr-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))
              : // Render actual trending topics from Firebase
                trendingTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`topic-card min-w-[280px] w-[280px] flex-shrink-0 p-6 snap-start ${
                      topic.active ? "active" : ""
                    }`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    <h3 className="text-lg font-medium mb-2">{topic.title}</h3>
                    {topic.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {topic.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {topic.tags &&
                        topic.tags.map((tag, idx) => {
                          const tagClass = `tag tag-${tag
                            .toLowerCase()
                            .replace("#", "")}`;
                          return (
                            <span key={idx} className={tagClass}>
                              {tag}
                            </span>
                          );
                        })}
                    </div>
                    <div className="flex items-center mt-4">
                      {topic.avatar ? (
                        <Avatar className="w-8 h-8 mr-2">
                          <AvatarImage
                            src={topic.avatar}
                            alt={`${topic.author} avatar`}
                          />
                          <AvatarFallback>
                            {getInitials(topic.author)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-8 h-8 rounded-full mr-2 bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-500 dark:text-blue-300">
                          {getInitials(topic.author)}
                        </div>
                      )}
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {topic.author}
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Dialog for displaying topic content */}
        {selectedTopic && (
          <Dialog
            open={!!selectedTopic}
            onOpenChange={(open) => {
              if (!open) setSelectedTopic(null);
            }}
          >
            <DialogContent className="max-w-3xl w-[90vw] p-4 sm:p-6 mx-auto max-h-[90vh] overflow-y-auto">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-xl sm:text-2xl font-semibold pr-6">
                  {selectedTopic.title}
                </DialogTitle>
                {/* <DialogClose
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </DialogClose> */}
              </DialogHeader>
              <div className="mt-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedTopic.tags &&
                    selectedTopic.tags.map((tag, idx) => {
                      const tagClass = `tag tag-${tag
                        .toLowerCase()
                        .replace("#", "")}`;
                      return (
                        <span key={idx} className={tagClass}>
                          {tag}
                        </span>
                      );
                    })}
                </div>

                {/* Display the topic content */}
                {selectedTopic.content ? (
                  <div className="prose dark:prose-invert max-w-none mt-4 mb-6 text-sm sm:text-base">
                    <div
                      dangerouslySetInnerHTML={{ __html: formatNotionContent(selectedTopic.content) }}
                    />
                  </div>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base">
                    {selectedTopic.description ||
                      "No content available for this topic."}
                  </p>
                )}

                <div className="flex items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {selectedTopic.avatar ? (
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-3">
                      <AvatarImage
                        src={selectedTopic.avatar}
                        alt={`${selectedTopic.author} avatar`}
                      />
                      <AvatarFallback>
                        {getInitials(selectedTopic.author)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-500 dark:text-blue-300">
                      {getInitials(selectedTopic.author)}
                    </div>
                  )}
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedTopic.author}
                  </span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

// Default trending topics for fallback
const getDefaultTrendingTopics = (): TrendingTopic[] => [
  {
    id: "1",
    title: "NestJS Fundamentals & Best Practices",
    description: "A comprehensive guide to NestJS architecture and best practices",
    tags: ["#BACKEND", "#TYPESCRIPT", "#NESTJS"],
    author: "Tuan Nguyen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    active: true,
    content: `## **1. NestJS là gì?**

**NestJS** là một **framework Node.js** dựa trên **TypeScript** giúp xây dựng **ứng dụng backend mạnh mẽ, có cấu trúc rõ ràng, dễ mở rộng**.

🔹 **Sử dụng kiến trúc mô-đun (Modular Architecture)** giúp code dễ quản lý.

🔹 **Hỗ trợ Dependency Injection (DI)** giúp code dễ bảo trì và test.

🔹 **Hỗ trợ tích hợp với các công nghệ phổ biến**: GraphQL, WebSockets, Redis, Kafka...

🔹 **Dựa trên Express.js hoặc Fastify** (chọn runtime tùy theo nhu cầu).

---

## **2. Cấu trúc tối ưu cho dự án NestJS**

### 🏗 **Cấu trúc thư mục chuẩn**

\`\`\`sh
src/
│── modules/
│   │── users/        # Module quản lý User
│   │   │── dto/      # Data Transfer Objects (validate request data)
│   │   │── entities/ # Entity (nếu dùng TypeORM)
│   │   │── interfaces/ # Interface cho type safety
│   │   │── users.controller.ts # Controller (route xử lý request)
│   │   │── users.service.ts    # Service (business logic)
│   │   │── users.module.ts     # Định nghĩa module
│   │── auth/          # Module xác thực người dùng
│   │── flights/       # Module quản lý chuyến bay (ví dụ)
│── common/          # Chứa các thành phần dùng chung
│   │── filters/      # Global Exception Filters
│   │── guards/       # Authorization Guards
│   │── interceptors/ # Logging, Transform Response
│   │── middleware/   # Middleware Custom
│   │── pipes/        # Validation Pipe
│── config/          # Config theo môi trường
│   │── config.module.ts
│   │── database.config.ts
│── database/        # Database connection & migrations
│   │── prisma/      # Nếu dùng Prisma ORM
│── shared/          # Các service dùng chung
│── main.ts          # File khởi chạy ứng dụng
│── app.module.ts    # Module gốc của ứng dụng
│── app.controller.ts # Controller root (nếu có)
│── app.service.ts    # Service root (nếu có)
\`\`\`

📌 **Lợi ích của cấu trúc này:**

✅ **Dễ mở rộng & quản lý** theo module.

✅ **Phân chia rõ ràng giữa controller, service, dto, entity**.

✅ **Tái sử dụng nhiều thành phần với common/ & shared/**.

✅ **Dễ test từng phần** bằng cách inject service trong module.

---

## **3. Cấu trúc Module trong NestJS**

Mỗi module trong NestJS đại diện cho một phần chức năng của hệ thống (ví dụ: Users, Flights, Auth).

🔹 **Một module bao gồm:**

- **Controller** → Xử lý request/response.
- **Service** → Chứa logic nghiệp vụ.
- **DTO (Data Transfer Object)** → Kiểm tra dữ liệu đầu vào.
- **Entity/Schema** → Đại diện cho cấu trúc dữ liệu (nếu dùng ORM).

---

### **4. Ví dụ triển khai một module chuẩn**

### 📌 **Tạo Module \`users\`**

### **1️⃣ Tạo module users**

\`\`\`sh
nest generate module users
\`\`\`

### **2️⃣ Tạo service users**

\`\`\`sh
nest generate service users
\`\`\`

📌 **users.service.ts**

\`\`\`tsx
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }
}
\`\`\`

---

### **3️⃣ Tạo controller users**

\`\`\`sh
nest generate controller users
\`\`\`

📌 **users.controller.ts**

\`\`\`tsx
import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.usersService.findOne(Number(id));
  }
}
\`\`\`

---

### **4️⃣ Định nghĩa module users**

📌 **users.module.ts**

\`\`\`tsx
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export để module khác có thể sử dụng
})
export class UsersModule {}
\`\`\`

---

## **5. Tích hợp các thành phần nâng cao**

### **📌 1️⃣ Sử dụng DTO để kiểm tra dữ liệu đầu vào**

📌 **users.dto.ts**

\`\`\`tsx
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
\`\`\`

📌 **Cập nhật \`users.controller.ts\` để dùng DTO**

\`\`\`tsx
import { Body, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';

@Post()
createUser(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
\`\`\`

---

### **📌 2️⃣ Sử dụng Guards để bảo vệ route**

📌 **auth.guard.ts**

\`\`\`tsx
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.headers.authorization === 'Bearer secret-token';
  }
}
\`\`\`

📌 **Áp dụng vào route**

\`\`\`tsx
import { UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Get('protected')
getProtectedData() {
  return { message: 'This is protected' };
}
\`\`\`

---

### **📌 3️⃣ Exception Filter - Xử lý lỗi chung**

📌 **http-exception.filter.ts**

\`\`\`tsx
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
\`\`\`

📌 **Dùng Global Filter trong \`main.ts\`**

\`\`\`tsx
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
\`\`\`

---

## **6. Kết luận**

🎯 **NestJS là framework mạnh mẽ để xây dựng backend**.

✅ **Sử dụng kiến trúc module giúp code dễ mở rộng & bảo trì**.

✅ **Dùng DTO, Guards, Filters để làm code sạch & an toàn**.

✅ **Tích hợp với ORM, Redis, Kafka, WebSockets một cách dễ dàng**.`,
  },
  {
    id: "2",
    title: "Data Preprocessing | Các phương pháp tiền xử lí dữ liệu",
    description: "(Đang cập nhật)",
    tags: ["#DATABASE", "#DATAMESH", "#PREPROCESSING"],
    author: "hangtuanthiendi",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "3",
    title: "Database Languages and Entity Relationship",
    description: "10",
    tags: ["#DATABASE", "#DATAMESH"],
    author: "Minh Trí",
  },
  {
    id: "4",
    title: "DataMesh: Những điều cơ bản nhất bạn cần biết",
    description: "(Updating)",
    tags: ["#DATABASE", "#DATAMESH"],
    author: "hangtuanthiendi",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "5",
    title: "MongoDB Aggregation",
    tags: ["#CERTIFICATION"],
    author: "hangtuanthiendi",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "6",
    title: "Postgres Repository",
    tags: ["#CERTIFICATION"],
    author: "hangtuanthiendi",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "7",
    title: "Campaign manager 360 Certification Exam",
    tags: ["#CERTIFICATION"],
    author: "hangtuanthiendi",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

export default TrendingTopicsSection;
