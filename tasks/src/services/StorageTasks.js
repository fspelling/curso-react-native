import AsyncStorage from '@react-native-community/async-storage';

export default class StorageTasks {
    delete = async (id) => {
        const tasksData = await AsyncStorage.getItem('tasks');

        if (tasksData) {
            let tasksList = JSON.parse(tasksData) || [];

            const findItem = tasksList.find((item, i) => {
                let indice = -1;

                if (item.id == id)
                    indice = i;

                return i;
            });

            tasksList.splice(findItem, 1);
            await AsyncStorage.setItem('tasks', JSON.stringify(tasksList));
        }
    }

    post = async (task) => {
        let tasksList = [];

        const newTask = { id: Math.random(), ...task, doneAt: null };
        const tasksData = await AsyncStorage.getItem('tasks');

        if (tasksData)
            tasksList = JSON.parse(tasksData) || [];

        tasksList.push(newTask);

        await AsyncStorage.setItem('tasks', JSON.stringify(tasksList));
    }

    get = async (date) => {
        const tasksData = await AsyncStorage.getItem('tasks');
        let tasksReturn = [];

        if (tasksData) {
            const tasksList = JSON.parse(tasksData) || [];

            //tasksReturn = tasksList.filter(item => item.estimateAt <= date);
            tasksReturn = [...tasksList];
        }

        return tasksReturn;
    }

    put = async (id) => {
        const tasksData = await AsyncStorage.getItem('tasks');

        if (tasksData) {
            let tasksList = JSON.parse(tasksData) || [];
            const itemFilter = tasksList.filter(item => item.id.toString() == id.toString())[0];

            itemFilter.doneAt = itemFilter.doneAt ? null : true;
            await AsyncStorage.setItem('tasks', JSON.stringify(tasksList));
        }
    }
}