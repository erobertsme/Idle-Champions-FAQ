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
