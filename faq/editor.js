var data = {
  questions: [
    {
      "category": "Test",
      "question": "Lorem ipsum dolor sit amet?",
      "answer": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus."
    },
    {
      "category": "Test2",
      "question": "2nd Lorem ipsum dolor sit amet?",
      "answer": "2nd Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus."
    },
    {
      "category": "Test3",
      "question": "3nd Lorem ipsum dolor sit amet?",
      "answer": "3nd Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus."
    },
    {
      "question": "4rd Lorem ipsum dolor sit amet?",
      "answer": "4rd Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus."
    },
    {
      "category": "Test",
      "question": "5nd Lorem ipsum dolor sit amet?",
      "answer": "5nd Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus."
    }
  ]
};

new Vue({
  el: '#content',
  data: {
    newQuestion: {
      //"category": this.category,
      "question": this.question,
      "answer": this.answer
    },
    questions: data.questions,
    output: ""
  },
  methods: {
    addQuestion() {
      var newQuestion = this.newQuestion
      var addingQuestion = new Object();
      //addingQuestion.category = newQuestion.category;
      addingQuestion.question = newQuestion.question;
      addingQuestion.answer =  newQuestion.answer;
      data.questions.push(addingQuestion);

      this.newQuestion = {"question": "", "answer": ""};
    },
    outputData() {
      this.output = "var data = {\nquestions: "
        + JSON.stringify(this.questions, null, 2)
        + "\n}"
    },

  },
  computed: {
    categorized: function() {
      function prepareQuestions(currentObj, question) {
        if (currentObj.hasOwnProperty(question.category)) {
          currentObj[question.category].push(question)
        }
        else {
          currentObj[question.category] = [question]
        }
        return currentObj
      }
      return this.questions.reduce(prepareQuestions, {})
    },
    categories: function() {
      return Object.keys(this.categorized);
    }
  }
})
