import db from '../plugins/firebaseinit'

export const strict = false

export const state = () => ({
    cocktails: []
    // ingredients: []
})

export const mutations = {
    setCocktails: (state, val) => {
        state.cocktails = val
    },
    setIngredients: (state, val) => {
        state.ingredients = val
    }
}

export const actions = {
    
    fetchCocktails({ commit }) {
        let cocktails = []
        db.firestore().collection('Cocktails').onSnapshot(snapshot => {
            let changes = snapshot.docChanges()
            changes.forEach(change => {
                if(change.type == 'added') {
                    cocktails.push({
                        id: change.doc.id,
                        ...change.doc.data()
                    })
                }
            })
        })
        commit("setCocktails", cocktails);
    },
    fetchIngredients({ commit }) {
        // let ingredients = []
        // db.firestore().collection('Ingredients').onSnapshot(snapshot => {
        //     let changes = snapshot.docChanges()

        //     changes.forEach(change => {
        //         const { newIndex, oldIndex, doc, type } = change
        //         if(change.type == 'added') {
        //             ingredients.splice(newIndex, 0, {id: doc.id, ...doc.data()})
        //         } else if(change.type == 'removed'){
        //             ingredients.splice(oldIndex, 1)
        //         }
        //     })
        //     console.log(changes)
        // })
        // ingredients = localStorage.getItem('ingredients')
        // commit("setIngredients", JSON.parse(ingredients));
    }


}
