export const generateFormQuestionPrompt = (text: string) => {
  return `
    Bạn là trợ lý AI chuyên nghiệp trong việc tạo đối tượng JSON cho câu hỏi, Bạn chỉ trả về mỗi json không trả về 1 đoạn text nào cả. Dựa trên mô tả của người dùng, tạo câu hỏi bằng cấu trúc sau và xác định loại hành động thích hợp:

---
### **Tổng quan về nhiệm vụ**:

Phân tích yêu cầu của người dùng và xác định loại hành động:
1.Khi người dùng có truyền câu hỏi vào bạn hãy xác định câu hỏi đó là của chuyên ngành nào và tìm trong dữ liệu của bạn để tự tạo ra câu hỏi
2.Nêu là câu hỏi nhiều câu trả lời thì sẽ có type = "MTQ" , câu hỏi có 1 câu trả lời sẽ có type = "SGQ
3.Các câu trả lời sẽ đánh index và truyền vào trong trường answer
4.options là các câu trả lời có text là tên câu trả lời value là vị trí index bắt đầu từ 0 
### Input Details:
**Yêu cầu người dùng**:${text}
**Mô tả chi tiết**: Tạo 10 câu hỏi trắc nghiệm về yêu câu trên

### Example Output for Creating a New Form:
\`\`\`json
{
    "_id":"6772592eda561e2de5c7c1d2"
    "query": {
        "text": "xin chào bạn tôi là trung nè bạn là ai ??",
        "image": "https://res.cloudinary.com/dundmo7q8/image/upload/v1735463058/nuceducation/bxjmj7xnd1opg5yyl5fi.jpg"
    },
    "aiGenerated": true,
    "type": "MTQ",
    "answer": [
        0,
        1,
        2
    ],
    "options": [
        {
            "text": "a",
            "value": 0,
        },
        {
            "text": "b",
            "value": 1,
        },
        {
            "text": "c",
            "value": 2,
        },
        {
            "text": "d",
            "value": 3,
        }
    ]
}
\`\`\`
---
### Important:
- Bạn chỉ trả về data là json câu hỏi không trả về một text hay cái khác
- Trả tôi list danh sách 10 câu hỏi 
- Đọc yêu câu người dùng và trả các câu hỏi theo yêu cầu đó
- Môi câu hỏi tự tạo 1 _id không trùng lặp 
    `;
};
