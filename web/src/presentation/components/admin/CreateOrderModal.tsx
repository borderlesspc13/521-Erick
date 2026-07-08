'use client';

import { FormEvent, useState } from 'react';
import { OrderStatus } from '@/domain/entities/Order';
import { ORDER_TIMELINE_STEPS } from '@/presentation/components/orders/orderTimelineSteps';
import { createOrderSchema, type CreateOrderInput } from '@/domain/schemas/order.schema';
import type { CreateOrderData } from '@/domain/repositories/IOrderRepository';
import { formatCnpj } from '@/domain/utils/cnpj';
import { Input } from '@/presentation/components/ui/Input';

interface CreateOrderModalProps {
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: CreateOrderData) => Promise<boolean>;
}

function getDefaultFormValues(): CreateOrderInput {
  return {
    clientCnpj: '',
    orderDate: new Date().toISOString().slice(0, 10),
    estimatedValue: 0,
    weightInKg: 0,
    status: OrderStatus.AGUARDANDO_APROVACAO,
  };
}

export function CreateOrderModal({
  isOpen,
  isSubmitting,
  onClose,
  onSubmit,
}: CreateOrderModalProps) {
  const [formValues, setFormValues] = useState<CreateOrderInput>(getDefaultFormValues);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateOrderInput, string>>>({});

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    setFormValues(getDefaultFormValues());
    setErrors({});
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsed = createOrderSchema.safeParse(formValues);

    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof CreateOrderInput, string>> = {};

      for (const issue of parsed.error.issues) {
        const field = issue.path[0];

        if (typeof field === 'string' && !fieldErrors[field as keyof CreateOrderInput]) {
          fieldErrors[field as keyof CreateOrderInput] = issue.message;
        }
      }

      setErrors(fieldErrors);
      return;
    }

    const success = await onSubmit({
      clientCnpj: formatCnpj(parsed.data.clientCnpj),
      orderDate: new Date(`${parsed.data.orderDate}T12:00:00`).toISOString(),
      estimatedValue: parsed.data.estimatedValue,
      weightInKg: parsed.data.weightInKg,
      status: parsed.data.status,
    });

    if (success) {
      setFormValues(getDefaultFormValues());
      setErrors({});
      onClose();
    }
  };

  return (
    <div className="kanban-modal" role="presentation" onClick={handleClose}>
      <div
        className="kanban-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-order-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="kanban-modal__header">
          <div>
            <p className="eyebrow dark">Novo pedido</p>
            <h2 id="create-order-title">Cadastrar pedido</h2>
          </div>
          <button
            type="button"
            className="kanban-modal__close"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Fechar"
          >
            ×
          </button>
        </header>

        <form className="kanban-modal__form" onSubmit={(event) => void handleSubmit(event)}>
          <Input
            label="CNPJ do cliente"
            name="clientCnpj"
            placeholder="00.000.000/0000-00"
            value={formValues.clientCnpj}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                clientCnpj: formatCnpj(event.target.value),
              }))
            }
            error={errors.clientCnpj}
            disabled={isSubmitting}
          />

          <Input
            label="Data do pedido"
            name="orderDate"
            type="date"
            value={formValues.orderDate}
            onChange={(event) =>
              setFormValues((current) => ({ ...current, orderDate: event.target.value }))
            }
            error={errors.orderDate}
            disabled={isSubmitting}
          />

          <div className="kanban-modal__grid">
            <Input
              label="Valor estimado (R$)"
              name="estimatedValue"
              type="number"
              min="0"
              step="0.01"
              value={formValues.estimatedValue || ''}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  estimatedValue: Number(event.target.value),
                }))
              }
              error={errors.estimatedValue}
              disabled={isSubmitting}
            />

            <Input
              label="Peso (kg)"
              name="weightInKg"
              type="number"
              min="0"
              step="0.1"
              value={formValues.weightInKg || ''}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  weightInKg: Number(event.target.value),
                }))
              }
              error={errors.weightInKg}
              disabled={isSubmitting}
            />
          </div>

          <label className="kanban-modal__select-label" htmlFor="order-status">
            Etapa inicial
          </label>
          <select
            id="order-status"
            className="kanban-modal__select"
            value={formValues.status}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                status: event.target.value as OrderStatus,
              }))
            }
            disabled={isSubmitting}
          >
            {ORDER_TIMELINE_STEPS.map((step) => (
              <option key={step.status} value={step.status}>
                {step.label}
              </option>
            ))}
          </select>

          <footer className="kanban-modal__footer">
            <button
              type="button"
              className="kanban-modal__secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button type="submit" className="kanban-modal__primary" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Criar pedido'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
