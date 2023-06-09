import russianMessages from "@haulmont/ra-language-russian";
import {TranslationMessages} from "react-admin";

export const ru: TranslationMessages = {
    ...russianMessages,
    resources: {
        EmailTemplate: {
            name: "Шаблон Email |||| Шаблоны Email",
            fields: {
                name: "Наименование",
                code: "Код",
                description: "Описание",
                from: "Отправитель",
                to: "Получатель",
                cc: "Копия",
                bcc: "Скрытая копия",
                subject: "Тема",
                bodyContent: "Содержимое",
                parameters: "Входные параметры",
                createdDate: "Дата создания",
                createdBy: "Создан кем",
                lastModifiedDate: "Дата последнего изменения",
                lastModifiedBy: "Изменен кем",
            },
            empty: "Нет шаблонов Email.",
            invite: "Вы хотите добавить еще один?"
        },
        EmailTemplateParameter: {
            name: "Входной параметр |||| Входные параметры",
            fields: {
                name: "Наименование",
                alias: "Псевдоним",
                required: "Обязательность",
                parameterType: "Тип"
            },
            ParameterType: {
                string: "Строка",
                date: "Дата",
                dateTime: "Дата и время",
                time: "Время",
                boolean: "Логической значение",
                integer: "Целое число",
                bigDecimal: "Число"
            },
            empty: "Нет входных параметров.",
            invite: "Хотите добавить?"
        },
        EmailMessage: {
            name: "Email сообщение |||| История Email",
            fields: {
                subject: "Тема",
                from: "Отправитель",
                to: "Получатель",
                cc: "Копия",
                bcc: "Скрытая копия",
                sendingStatus: "Статус",
                sendingDate: "Дата отправки",
                createdDate: "Дата создания",
                bodyContentType: "Тип содержимого",
                contentText: "Содержимое",
                attachments: "Вложения"
            },
            empty: "Нет отправленных Email.",
            SendingStatus: {
                notSent: "Не отправлено",
                sending: "Отправляется",
                sent: "Отправлено"
            }
        },
        EmailTemplateJob: {
            name: "Запланированная задача |||| Планировщик Email",
            fields: {
                description: "Описание",
                cronExpression: "Cron выражение",
                startDate: "Дата начала",
                endDate: "Дата окончания",
                state: "Состояние",
                emailTemplate: "Шаблон Email",
                subject: "Тема",
                from: "Отправитель",
                to: "Получатель",
                cc: "Копия",
                bcc: "Скрытая копия",
                parameterValues: "Значения параметров"
            },
            empty: "Нет задач по отправке Email.",
            JobState: {
                active: "Активна",
                paused: "Остановлена"
            }
        }
    },
    EmailTemplateList: {
        sendEmail: "Отправить Email",
        filter: {
            nameOrCode: "Наименование или код"
        },
        copy: {
            success: "Шаблон '%{sourceEmailTemplate}' скопирован",
            error: "Не удалось скопировать шаблон '%{sourceEmailTemplate}'",
            action: "Копировать"
        }
    },
    SendEmailScreen: {
        title: "Отправить Email по шаблону %{emailTemplateName}",
        emailInfo: "Информация для отправки",
        inputParameters: "Входные параметры",
        send: "Отправить",
        viewTemplate: "Посмотреть шаблон"
    },
    EmailTemplateCreate: {
        title: "Создать шаблон Email"
    },
    EmailTemplateEdit: {
        title: "Шаблон Email %{templateName}",
        general: {
            title: "Основная информация"
        },
        parameters: "Входные параметры",
        emailSending: "Отправка Email",
        attachments: "Вложения",
        inputParametersHint: {
            mainText: `Входные параметры можно объявлять в редакторе HTML с помощью синтаксиса: <strong>\${псевдонимПараметра}</strong>. <br/>\
                См. примеры в документации `,
            thymeleafDocs: "Thymeleaf."
        },
        auditGroup: {
            title: "Создание и последнее изменение"
        }
    },
    InputParameterEditDialog: {
        title: {
            create: "Создать входной параметр",
            edit: "Редактировать входной параметр"
        },
        validation: {
            aliasRegexp: "Должно быть в формате (regexp): [a-zA-Z0-9_]+",
            aliasDuplicate: "Входной параметр с таким псевдонимом уже существует"
        }
    },
    EmailTemplateShow: {
        noInputParameters: "Нет входных параметров",
        noAttachments: "Нет вложений"
    },
    EmailHistory: {
        viewEmailContent: "Просмотр содержимого"
    },
    EmailHistoryList: {
        filter: {
            to: "Получатель",
            from: "Отправитель",
            subject: "Тема",
            createdDateBefore: "Создано до",
            createdDateAfter: "Создано после",
            sendingDateBefore: "Отправлено до",
            sendingDateAfter: "Отправлено после",
            sendingStatuses: "Статус"
        }
    },
    EmailHistoryShow: {
        title: "Email сообщение %{emailMessageSubject}",
        mainTab: "Основная инфомарция",
        bodyContentTab: "Тело сообщения"
    },
    EmailTemplateJobList: {
        activate: {
            button: "Запустить",
            success: "Задача '%{jobDescription}' успешно активирована",
            error: "Не удалось активировать задачу '%{jobDescription}'"
        },
        deactivate: {
            button: "Остановить",
            success: "Задача '%{jobDescription}' успешно остановлена",
            error: "Не удалось остановить задачу '%{jobDescription}'"
        },
        trigger: {
            button: "Выполнить",
            success: "Задача '%{jobDescription}' успешно инициирована",
            error: "Не удалось инициировать задачу '%{jobDescription}'"
        }
    },
    EmailTemplateJobCreate: {
        title: "Создать запланированную задачу"
    },
    EmailTemplateJobEdit: {
        title: "Запланированная задача %{jobDescription}",
        saveAndActivate: "Сохранить и активировать",
        general: {
            title: "Основная информация",
            helpText: {
                cronExpression: `Cron выражение состоит из 6 или 7 полей, разделенных пробелами: секунда, минуты, час, день, месяц, день недели, год (опционально). Примеры:
                    <ul>
                       <li>0 0/5 * ? * * - запускает каждые 5 минут</li>
                       <li>0 0 8-10 ? * * - срабатывает в 8, 9 и 10 часов каждый день</li>
                       <li>0 10,44 14 ? 3 WED - срабатывает в 14:10 и в 14:44 каждую среду в марте</li>
                       <li>0 15 10 ? * 6#3 - срабатывает в 10:15 в третью пятницу каждого месяца</li>
                       <li>0 0 0 25 12 ? - запускается каждое Рождество в полночь</li>
                   </ul>
                  См. больше примеров в документации `,
                quartzDocs: "Quartz."
            }
        },
        inputParameters: "Входные параметры",
        emailSending: "Отправка Email"
    },
    notification: {
        emailSent: "Отправка Email \"%{subject}\" прошла успешно",
        emailNotSent: "Не удалось отправить Email"
    },
    HtmlContentInput: {
        exportDialog: {
            title: "Исходный HTML",
            exportButton: "Экспорт в ZIP-архив",
            saveChangesButton: "Сохранить"
        },
        importDialog: {
            title: "Импорт HTML",
            okButton: "Импорт"
        },
        clearCanvasDialog: {
            title: "Очистить содержимое",
            content: "Вы уверены, что хотите очистить содержимое?"
        }
    },
    common: {
        deleteTitle: "Удалить %{name} \"%{instanceName}\"",
        deleteContent: "Вы уверены что хотите удалить этот объект?",
        validation: {
            invalidCron: "Некорретное Cron выражение",
            invalidEndDate: "Дата окончания должна быть позже даты начала"
        },
        accessDenied: "Доступ запрещен",
        clearFilter: "Сбросить фильтр",
        sortBy: "Сортировать",
        editTitle: "%{name} %{recordRepresentation}",
        actions : {
            ok: "OK"
        }
    },
    EmailManyInput: {
        helperText: "Введите Email и нажмите Enter для добавления значения",
        placeholder: "Добавить Email",
        validation: {
            invalidEmail: "Некорректный Email"
        }
    },
};